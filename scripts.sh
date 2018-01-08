#!/usr/bin/env bash

export PATH="$PATH:./node_modules/.bin";
export CURRENT_PATH=$PWD;

case ${1} in
  libs.publish)
    eval $(ssenpack libs.publish);
    ;;
  start)
    osascript << EOT
      tell application "iTerm"
        set serverWatchWindow to (create window with default profile)
          tell current session of serverWatchWindow
            write text "cd $CURRENT_PATH; npm run web.server.dev.build.watch"
            
            set servePane to (split vertically with default profile)
            tell servePane
              write text "cd $CURRENT_PATH; npm run web.dev.start"
            end tell
            
            set nodemonPane to (split horizontally with default profile)
            tell nodemonPane
              write text "cd $CURRENT_PATH; npm run web.server.dev.start"
            end tell
          end tell
        activate
      end tell
EOT
    ;;
  start-electron)
    osascript << EOT
      tell application "iTerm"
        set electronWatchWindow to (create window with default profile)
          tell current session of electronWatchWindow
            write text "cd $CURRENT_PATH; npm run electron.dev.build.watch"
            
            set electronPane to (split vertically with default profile)
            tell electronPane
              delay 10
              write text "cd $CURRENT_PATH; npm run electron.dev.start"
            end tell
          end tell
        activate
      end tell
EOT
    ;;
esac