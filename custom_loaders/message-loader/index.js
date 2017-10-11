const loaderUtils = require('loader-utils');

module.exports = function (content) {
  const query = loaderUtils.parseQuery(this.resourceQuery);
  
  // language=JavaScript
  return `
    if (!window.__MESSAGE_STORE__) window.__MESSAGE_STORE__ = {};
    if (!window.__MESSAGE_STORE__['${query.language}']) window.__MESSAGE_STORE__['${query.language}'] = {};
    window.__MESSAGE_STORE__['${query.language}'] = Object.assign({}, window.__MESSAGE_STORE__['${query.language}'], ${content});
    window.dispatchEvent(new Event('__MESSAGE_STORE_UPDATED__'));
    module.exports = {};
  `;
};