'use strict';
var fs = require('fs');

function usingProxy() {
  var usingProxyArg = !!process.argv.filter(function (arg) {
    return arg.indexOf('--proxy') === 0;
  }).length;

  var hasGeneratedProxies = false;
  var proxiesDir = process.env.PWD + '/server/proxies';
  try {
    fs.lstatSync(proxiesDir);
    hasGeneratedProxies = true;
  } catch (e) {}

  return usingProxyArg || hasGeneratedProxies;
}

module.exports = function(environment, appConfig) {
  appConfig['ember-cli-mirage'] = appConfig['ember-cli-mirage'] || {};
  appConfig['ember-cli-mirage']['usingProxy'] = usingProxy();

  return {};
};
