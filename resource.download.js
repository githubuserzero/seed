const fetch = require('node-fetch');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

function download(file, url) {
  file = path.resolve(file);
  const dir = path.dirname(file);
  
  mkdirp.sync(dir);
  
  fetch(url).then(res => {
    const fileStream = fs.createWriteStream(file);
    res.body.pipe(fileStream);
    res.body.on('error', error => {
      console.error(`💀 Failed to save "${url}" as "${file}"`);
      console.error(error);
    });
    fileStream.on('finish', () => {
      console.log(`😋 Succeeded in saving "${url}" as "${file}"`);
    });
  });
}

download('./src/generated/timezone.json', `http://api.timezonedb.com/v2/list-time-zone?key=${process.env.TIMEZONEDB_KEY}&format=json`);
