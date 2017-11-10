const glob = require('glob');
const fs = require('fs');
const path = require('path');

function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    
    return messages;
  }, {});
}

glob(path.resolve(__dirname, '../**/messages/*.json'), (err, matches) => {
  if (err) throw err;
  const translations = new Map;
  const keys = new Set;
  const languages = new Set;
  
  for (const match of matches) {
    if (path.dirname(match) === __dirname) continue;
    
    const text = fs.readFileSync(match, {encoding: 'utf8'});
    const language = /\/([a-z]{2}).json$/.exec(match)[1];
    const messages = flattenMessages(JSON.parse(text));
    
    if (!languages.has(language)) languages.add(language);
    
    for (const key of Object.keys(messages)) {
      if (!keys.has(key)) keys.add(key);
    }
    
    if (translations.has(language)) {
      translations.set(language, Object.assign({}, translations.get(language), messages));
    } else {
      translations.set(language, messages);
    }
  }
  
  for (const language of languages) {
    const messages = {};
    
    for (const key of keys) {
      messages[key] = translations.get(language)[key] || '{{' + key + '}}';
    }
    
    //console.log('build-messages.js..()', language, JSON.stringify(messages, null, 2));
    fs.writeFileSync(__dirname + '/' + language + '.json', JSON.stringify(messages, null, 2));
  }
});