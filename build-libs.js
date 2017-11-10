const {libs} = require('./config.json');
const fs = require('fs');
const glob = require('glob');

const createTSConfig = ({name, groupDir, indexFile}) => {
  return `
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "downlevelIteration": true,
    "typeRoots": [
      "node_modules/@types",
      "dist/libs"
    ],
    "lib": [
      "dom",
      "es2015",
      "es2016"
    ],
    "outDir": "declaration-rest",
    "declaration": true,
    "declarationDir": "dist/libs/${groupDir}${name}",
    "baseUrl": "src"
  },
  "files": [
    "src/library/${groupDir}${name}/${indexFile}"
  ]
}
  `;
};

const createWebpackConfig = ({name, groupDir, indexFile, libExternals}) => {
  const copyPlugin = (() => {
    const from = 'src/library/' + groupDir + name;
    const to = 'dist/libs/' + groupDir + name;
    const list = glob.sync(from + '/**/!(*.ts|*.tsx)')
                     .filter(file => {
                       return fs.existsSync(file) && !fs.statSync(file).isDirectory();
                     })
                     .map(file => {
                       return {
                         from: file,
                         to: file.replace(from + '/', to + '/'),
                       };
                     });
    
    return list.length > 0
      ? 'new CopyWebpackPlugin(' + JSON.stringify(list) + ')'
      : '';
  })();
  
  return `
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const include = file => {
  return file.indexOf(path.resolve(__dirname, 'src/library/${groupDir}${name}')) === 0;
};

module.exports = () => new Promise(resolve => {
  const extractCSS = new ExtractTextPlugin({filename: 'dist/libs/${groupDir}${name}/index.css', allChunks: true});
  
  const config = {
    devtool: 'source-map',
    
    entry: () => './src/library/${groupDir}${name}/${indexFile}',
    
    externals: [nodeExternals()].concat(${JSON.stringify(libExternals)}),
    
    output: {
      filename: 'dist/libs/${groupDir}${name}/index.js',
      libraryTarget: 'commonjs',
    },
    
    resolve: {
      extensions: ['.ts', '.js', '.tsx'],
    },
    
    module: {
      rules: [
        {
          test: /\\.(ts|tsx)$/,
          include,
          use: [
            {loader: 'awesome-typescript-loader'},
          ],
        },
        {
          test: /\\.css$/,
          include,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap=true&url=false&modules=true&localIdentName="[name]__[local]___[hash:base64:5]"&importLoaders=1',
              'postcss-loader',
            ],
          }),
        },
        {
          test: /\\.scss$/,
          include,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap=true&url=false&modules=true&localIdentName="[name]__[local]___[hash:base64:5]"&importLoaders=2',
              'postcss-loader',
              'sass-loader',
            ],
          }),
        },
      ],
    },
    
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      extractCSS,
      ${copyPlugin}
    ],
  };
  
  resolve([config]);
});
  `;
};

console.log(Object.keys(libs.entry).reduce(($, name) => {
  const {commands, libExternals} = $;
  const {group} = libs.entry[name];
  const groupDir = group ? group + '/' : '';
  const indexFile = fs.existsSync('src/library/' + groupDir + name + '/index.tsx')
    ? 'index.tsx'
    : 'index.ts';
  
  const param = {name, group, indexFile, groupDir, libExternals};
  const tsConfig = 'tsconfig.lib.' + name + '.json';
  const webpackConfig = 'webpack.lib.' + name + '.js';
  
  fs.writeFileSync(__dirname + '/' + tsConfig, createTSConfig(param));
  fs.writeFileSync(__dirname + '/' + webpackConfig, createWebpackConfig(param));
  
  commands.push('echo ');
  commands.push('echo Remove directory: ' + name);
  commands.push('echo ==============================================================');
  commands.push('rimraf ' + 'dist/libs/' + groupDir + name);
  commands.push('echo ');
  commands.push('echo Create TypeScript definition files: ' + name);
  commands.push('echo ==============================================================');
  commands.push('tsc --project ' + tsConfig);
  commands.push('rimraf declaration-rest');
  commands.push('echo ');
  commands.push('echo Build Webpack: ' + name);
  commands.push('echo ==============================================================');
  commands.push('webpack --config ' + webpackConfig);
  commands.push('rimraf ' + tsConfig);
  commands.push('rimraf ' + webpackConfig);
  
  libExternals.push(groupDir + name);
  
  return $;
}, {commands: [], libExternals: []}).commands.join(';\n'));