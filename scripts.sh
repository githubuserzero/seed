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
        set ITERM to (create window with default profile)
          tell current session of ITERM
            write text "cd $CURRENT_PATH; npm run web.server.dev.build.watch"

            set SERVER to (split vertically with default profile)
            tell SERVER
              write text "cd $CURRENT_PATH; npm run web.dev.start"
            end tell

            set NODEMON to (split horizontally with default profile)
            tell NODEMON
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
        set ITERM to (create window with default profile)
          tell current session of ITERM
            write text "cd $CURRENT_PATH; npm run electron.dev.build.watch"

            set ELECTRON to (split vertically with default profile)
            tell ELECTRON
              delay 10
              write text "cd $CURRENT_PATH; npm run electron.dev.start"
            end tell
          end tell
        activate
      end tell
EOT
    ;;
  download-resources)
    curl -o "./src/timezone.json" "http://api.timezonedb.com/v2/list-time-zone?key=$TIMEZONEDB_KEY&format=json";
    ;;
esac