const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const {directory, port} = require('./config');
const config = require('./webpack.config');

config({action: 'serve', port}).then(config => {
  const bundler = webpack(config);
  
  browserSync({
    port,
    open: false,
    
    server: {
      baseDir: [
        directory.dll,
        ...directory.static,
      ],
      
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: config.output.publicPath,
          stats: {colors: true},
        }),
        
        webpackHotMiddleware(bundler),
      ],
    },
    
    files: [
      `./${directory.dll}`,
      ...directory.static.map(dir => `./${dir}`),
    ],
  });
});

