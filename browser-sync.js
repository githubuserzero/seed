const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const compression = require('compression');

const {web, server} = require('./config.json');
const config = require('./webpack.config');

config({action: 'serve:web', port: web.port}).then(config => {
  const bundler = webpack(config);
  
  browserSync({
    port: web.port,
    open: false,
    
    server: {
      baseDir: [
        'dist-dev/dll',
        ...web.static,
      ],
      
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: config.output.publicPath,
          stats: {colors: true},
        }),
        
        webpackHotMiddleware(bundler),
        
        proxyMiddleware(['**', '!**/*.*'], {
          target: 'http://localhost:' + server.port,
        }),
  
        compression(),
        
        //(req, res, next) => {
        //  res.setHeader('Cache-control', 'no-cache');
        //  next();
        //},
      ],
    },
    
    files: [
      './dist-dev/dll',
      ...web.static.map(dir => `./${dir}`),
    ],
  });
});

