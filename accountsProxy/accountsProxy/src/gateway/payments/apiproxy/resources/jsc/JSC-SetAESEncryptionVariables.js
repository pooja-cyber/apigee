var targetUsername = context.getVariable("du.config.selfcareUsername");
var targetPassword = context.getVariable("du.config.selfcarePassword");
var pathSuffix = context.getVariable("proxy.pathsuffix");
var pattern = /credit-card/i;
var result = pattern.test(pathSuffix);

var inputJson = context.getVariable("request.content");
if (inputJson) {
	inputJson = JSON.parse(inputJson);
}else{
	inputJson = {};
}

//Adding SelfCare id from path param - Retreive CC Conditional Flow
var selfcareId = context.getVariable("selfcareId");
if (selfcareId && result) {
	inputJson.SelfcareID = selfcareId;
}

inputJson.username = targetUsername;
inputJson.password = targetPassword;


context.setVariable("aes.json", JSON.stringify(inputJson));




