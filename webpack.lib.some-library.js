const webpack = require('webpack');
const path = require('path');

const external = (module) => ({
  commonjs2: module,
  commonjs: module,
  amd: module,
});

const externals = {
  'react': external('react'),
  'mobx-react': external('mobx-react'),
};

const name = 'some-library';

module.exports = (env) => new Promise(resolve => {
  const config = {
    devtool: 'source-map',
    
    entry: () => `./src/shared/${name}/index.ts`,
    
    externals,
    
    output: {
      filename: env.minify.toString() === 'true' ? `libs/${name}/index.min.js` : `libs/${name}/index.js`,
      libraryTarget: 'commonjs',
    },
    
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {loader: 'awesome-typescript-loader'},
          ],
          include: file => {
            return file.indexOf(path.resolve(__dirname, `src/shared/${name}`)) === 0;
          },
        },
      ],
    },
    
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  };
  
  if (env.minify.toString() === 'true') {
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    );
  }
  
  resolve([config]);
});