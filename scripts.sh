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
    osascript << EOT
      tell application "iTerm"
        set serverWatchWindow to (create window with default profile)
          tell current session of serverWatchWindow
            write text "cd $CURRENT_PATH; npm run watch:server:dev"
            
            set servePane to (split vertically with default profile)
            tell servePane
              write text "cd $CURRENT_PATH; npm run serve"
            end tell
            
            set nodemonPane to (split horizontally with default profile)
            tell nodemonPane
              write text "cd $CURRENT_PATH; npm run nodemon"
            end tell
          end tell
        activate
      end tell
EOT
    ;;
esac