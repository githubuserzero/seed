#!/usr/bin/env bash

export PATH="$PATH:./node_modules/.bin";
export CURRENT_PATH=$PWD;

case ${1} in
  build:libs)
    eval $(node build-libs.js);
    ;;
  publish:libs)
    eval $(node publish-libs.js);
    ;;
  start)
    osascript -e 'tell application "Terminal" to do script "cd '$CURRENT_PATH'; npm run watch:server:dev"';
    osascript -e 'tell application "Terminal" to do script "cd '$CURRENT_PATH'; npm run nodemon"';
    osascript -e 'tell application "Terminal" to do script "cd '$CURRENT_PATH'; npm run serve"';
    ;;
esac