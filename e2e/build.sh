#!/bin/bash

cwd=$(pwd);
output=$cwd/.e2e/build;

fileExists() {
  if ! ls $1 1> /dev/null 2>&1; then
    echo "ERROR: Undefined the file $1";
    exit 1;
  fi
}

npm run app:build --- --output $output;
fileExists $output/loadable-stats.json;
fileExists $output/size-report.html;
fileExists $output/browser/app.*.js;
fileExists $output/browser/favicon.ico;
fileExists $output/browser/manifest.json;
fileExists $output/browser/pages-Home.*.js;
fileExists $output/browser/pages-TimezoneSample.*.js;
fileExists $output/browser/pages-TranslationSample.*.js;
fileExists $output/browser/style.js.*.css;
fileExists $output/browser/style.js.*.js;
fileExists $output/browser/vendor.*.js;
fileExists $output/server/index.js;
fileExists $output/server/package.json;
fileExists $output/server/pages-Home.js;
fileExists $output/server/pages-TimezoneSample.js;
fileExists $output/server/pages-TranslationSample.js;