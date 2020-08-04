//Du mock target emulater,Test Comment
var ApiMocker = require('apimocker');

var options = {};

var apiMocker = ApiMocker.createServer(options)
    .setConfigFile('config.json')
    .start();
