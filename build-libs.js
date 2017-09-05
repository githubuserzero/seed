const {libs} = require('./config');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const createTSConfig = ({name, groupDir, indexFile, alias}) => {
  const paths = alias
    ? Object.keys(alias).reduce((paths, name) => {
      paths[name] = [path.resolve(__dirname, alias[name])];
      return paths;
    }, {})
    : {};
  
  return `
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "lib": [
      "dom",
      "es2015",
      "es2016"
    ],
    "outDir": "declaration-rest",
    "declaration": true,
    "declarationDir": "libs/${name}",
    "baseUrl": "src",
    "paths": ${JSON.stringify(paths)}
  },
  "files": [
    "src/shared/${groupDir}${name}/${indexFile}"
  ]
}
  `;
};

const createWebpackConfig = ({name, groupDir, indexFile, externals, alias}) => {
  const externalsMap = externals ? Object.keys(externals).reduce((map, name) => {
    map[name] = {
      commonjs2: name,
      commonjs: name,
      amd: name,
    };
    return map;
  }, {}) : '';
  
  const copyPlugin = (() => {
    const from = 'src/shared/' + groupDir + name;
    const to = 'libs/' + name;
    const list = glob.sync(from + '/**/!(*.ts|*.tsx|*.scss)')
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

const include = file => {
  return file.indexOf(path.resolve(__dirname, 'src/shared/${groupDir}${name}')) === 0;
};

module.exports = () => new Promise(resolve => {
  const extractCSS = new ExtractTextPlugin({filename: 'libs/${name}/index.css', allChunks: true});
  
  const config = {
    devtool: 'source-map',
    
    entry: () => './src/shared/${groupDir}${name}/${indexFile}',
    
    ${externals ? 'externals: ' + JSON.stringify(externalsMap) + ',' : ''}
    
    output: {
      filename: 'libs/${name}/index.js',
      libraryTarget: 'commonjs',
    },
    
    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css', '.tsx'],
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
              'css-loader?sourceMap=true&url=false&importLoaders=1',
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
              'css-loader?sourceMap=true&url=false&importLoaders=2',
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

console.log(Object.keys(libs).reduce((commands, name) => {
  const {group, externals, statics, alias} = libs[name];
  const groupDir = group ? group + '/' : '';
  const indexFile = fs.existsSync('src/shared/' + groupDir + name + '/index.tsx')
    ? 'index.tsx'
    : 'index.ts';
  
  const param = {name, group, indexFile, groupDir, externals, statics, alias};
  const tsConfig = 'tsconfig.lib.' + name + '.json';
  const webpackConfig = 'webpack.lib.' + name + '.js';
  
  fs.writeFileSync(__dirname + '/' + tsConfig, createTSConfig(param));
  fs.writeFileSync(__dirname + '/' + webpackConfig, createWebpackConfig(param));
  
  commands.push('rimraf libs/' + name);
  commands.push('tsc --project ' + tsConfig);
  commands.push('rimraf declaration-rest');
  commands.push('webpack --config ' + webpackConfig);
  commands.push('rimraf ' + tsConfig);
  commands.push('rimraf ' + webpackConfig);
  
  return commands;
}, []).join(';\n'));