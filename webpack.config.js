const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');
const nodeExternals = require('webpack-node-externals');

const {web, ssr} = require('./config.json');
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
    alias: fs.readdirSync('src/shared')
             .map(dir => 'src/shared/' + dir)
             .filter(dir => fs.statSync(dir).isDirectory())
             .reduce((alias, dir) => {
               alias[path.basename(dir)] = path.resolve(__dirname, dir);
               return alias;
             }, {}),
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

const webDevelopmentConfig = () => merge(baseConfig(), {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      chunks: Object.keys(web.entry),
    }),
    extractCSS,
    ...Object.keys(web.dll).map(name => {
      return new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(`./dist-dev/dll/${name}-manifest.json`),
      });
    }),
  ],
});

const webProductionConfig = () => merge(baseConfig(), {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      chunks: Object.keys(web.entry),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS,
  ],
});

const ssrDevelopmentConfig = () => merge(baseConfig(), {
  plugins: [
    extractCSS,
  ],
});

const ssrProductionConfig = () => merge(baseConfig(), {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS,
  ],
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

const webProductionBuild = () => merge(webProductionConfig(), {
  output: {
    path: path.join(__dirname, 'dist/web'),
  },
  
  entry: web.entry,
  
  plugins: [
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

const webDevelopmentBuild = () => merge(webDevelopmentConfig(), {
  devtool: 'source-map',
  cache: true,
  
  output: {
    path: path.join(__dirname, 'dist-dev/web'),
  },
  
  entry: web.entry,
});

const webServeConfig = (port) => merge(webDevelopmentConfig(), {
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

const ssrProductionBuild = () => merge(ssrProductionConfig(), {
  target: 'node',
  devtool: 'source-map',
  
  entry: {
    index: ssr.entry,
  },
  
  output: {
    path: path.join(__dirname, 'dist/ssr'),
    libraryTarget: 'commonjs',
  },
  
  externals: [nodeExternals()],
});

const ssrDevelopmentBuild = () => merge(ssrDevelopmentConfig(), {
  target: 'node',
  devtool: 'source-map',
  
  entry: {
    index: ssr.entry,
  },
  
  output: {
    path: path.join(__dirname, 'dist-dev/ssr'),
    libraryTarget: 'commonjs',
  },
  
  externals: [nodeExternals()],
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
    case 'build:ssr':
      rimraf('dist/ssr', err => err ? reject(err) : resolve());
      break;
    case 'build:ssr:dev':
      rimraf('dist-dev/ssr', err => err ? reject(err) : resolve());
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
    case 'build:ssr':
      return ssrProductionBuild();
    case 'build:ssr:dev':
      return ssrDevelopmentBuild();
    case 'serve:web':
      return webServeConfig(port);
  }
});
