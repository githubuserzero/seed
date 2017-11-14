const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');
const nodeExternals = require('webpack-node-externals');

const tsconfig = require('./tsconfig.json');
const {web, server} = require('./config.json');
const src = path.join(__dirname, 'src');

const extractCSS = new ExtractTextPlugin({filename: '[name].css', allChunks: true});

const baseConfig = () => ({
  target: 'web',
  
  output: {
    publicPath: '',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js',
  },
  
  plugins: [
    new CheckerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(false),
  ],
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: fs.readdirSync('src/library')
             .map(dir => 'src/library/' + dir)
             .filter(dir => fs.statSync(dir).isDirectory())
             .reduce((alias, dir) => {
               alias[path.basename(dir)] = path.resolve(__dirname, dir);
               return alias;
             }, {
               app: __dirname + '/src/app',
               contents: __dirname + '/src/contents',
               messages: __dirname + '/src/messages',
             }),
  },
  
  resolveLoader: {
    modules: ['node_modules'],
  },
  
  externals: web.externals,
  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: src,
        use: [
          {loader: 'awesome-typescript-loader'},
        ],
      },
      {
        test: /\.css$/,
        include: src,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap=true&url=false&modules=true&localIdentName="[name]__[local]___[hash:base64:5]"&importLoaders=1',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: src,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap=true&url=false&modules=true&localIdentName="[name]__[local]___[hash:base64:5]"&importLoaders=2',
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {loader: 'source-map-loader'},
        ],
      },
      {
        test: /\.html$/,
        include: src,
        use: [
          {loader: 'raw-loader'},
        ],
      },
      {
        test: /\.txt$/,
        include: src,
        use: [
          {loader: 'raw-loader'},
        ],
      },
      {
        test: /\.md$/,
        include: src,
        use: [
          {loader: 'raw-loader'},
          {loader: 'markdown-loader'},
        ],
      },
    ],
  },
});

const webDLLBuild = () => merge(baseConfig(), {
  devtool: 'source-map',
  
  output: {
    path: path.join(__dirname, 'dist-dev/dll'),
    library: '[name]_lib',
  },
  
  entry: web.dll,
  
  plugins: [
    new webpack.DllPlugin({
      path: './dist-dev/dll/[name]-manifest.json',
      name: '[name]_lib',
    }),
  ],
});

const webProductionBuild = () => merge(baseConfig(), {
  output: {
    path: path.join(__dirname, 'dist/web'),
  },
  
  entry: web.entry,
  
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      chunks: Object.keys(web.entry),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS,
    new CopyWebpackPlugin([
      ...web.static.map(dir => ({from: dir})),
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_debugger: true,
        drop_console: true,
      },
    }),
  ],
});

const webDevelopmentBuild = () => merge(baseConfig(), {
  devtool: 'source-map',
  cache: true,
  
  output: {
    path: path.join(__dirname, 'dist-dev/web'),
  },
  
  entry: web.entry,
  
  plugins: [
    extractCSS,
    //...Object.keys(web.dll).map(name => {
    //  return new webpack.DllReferencePlugin({
    //    context: '.',
    //    manifest: require(`./dist-dev/dll/monitoring/assets/${name}-manifest.json`),
    //  });
    //}),
  ],
});

const webServeConfig = (port) => merge(baseConfig(), {
  // devtool: 'cheap-module-source-map', // slow + update source map with hmr
  devtool: 'cheap-module-eval-source-map', // fast + no update source map with hmr
  cache: true,
  
  output: {
    path: path.join(__dirname),
  },
  
  entry: Object.keys(web.entry).reduce((obj, name) => {
    obj[name] = [
      `webpack-hot-middleware/client?http://localhost:${port}`,
      `webpack/hot/only-dev-server`,
    ].concat(Array.isArray(web.entry[name]) ? web.entry[name] : [web.entry[name]]);
    return obj;
  }, {}),
  
  plugins: [
    extractCSS,
    ...Object.keys(web.dll).map(name => {
      return new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(`./dist-dev/dll/${name}-manifest.json`),
      });
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      chunks: Object.keys(web.entry),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

const serverProductionBuild = () => merge(baseConfig(), {
  target: 'node',
  devtool: 'source-map',
  
  entry: {
    index: server.entry,
  },
  
  output: {
    path: path.join(__dirname, 'dist/server'),
    libraryTarget: 'commonjs',
  },
  
  externals: [nodeExternals()],
  
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS,
  ],
});

const serverDevelopmentBuild = () => merge(baseConfig(), {
  target: 'node',
  devtool: 'source-map',
  
  entry: {
    index: server.entry,
  },
  
  output: {
    path: path.join(__dirname, 'dist-dev/server'),
    libraryTarget: 'commonjs',
  },
  
  plugins: [
    extractCSS,
  ],
  
  externals: [nodeExternals()],
});

const electronDevelopmentBuild = () => merge(baseConfig(), {
  target: 'node',
  devtool: 'source-map',
  
  entry: web.entry,
  
  output: {
    path: path.join(__dirname, 'dist-dev/electron'),
    libraryTarget: 'commonjs2',
  },
  
  plugins: [
    extractCSS,
  ],
  
  externals: [nodeExternals({
    whitelist: Object.keys(tsconfig.compilerOptions.paths),
  })],
});

module.exports = ({action, port}) => new Promise((resolve, reject) => {
  switch (action) {
    case 'build:web':
      rimraf('dist/web', err => err ? reject(err) : resolve());
      break;
    case 'build:web:dev':
      rimraf('dist-dev/web', err => err ? reject(err) : resolve());
      break;
    case 'build:web:dev:dll':
      rimraf('dist-dev/dll', err => err ? reject(err) : resolve());
      break;
    case 'build:server':
      rimraf('dist/server', err => err ? reject(err) : resolve());
      break;
    case 'build:server:dev':
      rimraf('dist-dev/server', err => err ? reject(err) : resolve());
      break;
    case 'build:electron:dev':
      rimraf('dist-dev/electron', err => err ? reject(err) : resolve());
      break;
    case 'serve:web':
      resolve();
      break;
  }
}).then(() => {
  switch (action) {
    case 'build:web':
      return webProductionBuild();
    case 'build:web:dev':
      return webDevelopmentBuild();
    case 'build:web:dev:dll':
      return webDLLBuild();
    case 'build:server':
      return serverProductionBuild();
    case 'build:server:dev':
      return serverDevelopmentBuild();
    case 'build:electron:dev':
      return electronDevelopmentBuild();
    case 'serve:web':
      return webServeConfig(port);
  }
});
