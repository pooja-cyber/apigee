var secreteKey = context.getVariable("du.config.secret-key");
var operation = 'decrypt';

var responseJson = context.getVariable("response.content");
responseJson = JSON.parse(responseJson);
context.setVariable("aes.secret-key", secreteKey);
context.setVariable("aes.json", JSON.stringify(responseJson));
context.setVariable("aes.operation", operation);
