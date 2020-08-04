var targetUsername = context.getVariable("du.config.selfcareUsername");
var targetPassword = context.getVariable("du.config.selfcarePassword");
var selfcareId = context.getVariable("selfcareId");

var inputJson = context.getVariable("request.content");
if(inputJson){
	inputJson = JSON.parse(inputJson);	
}else{
	inputJson = {};
}
if (selfcareId) {
	inputJson.SelfcareID = selfcareId;
}

inputJson.username = targetUsername;
inputJson.password = targetPassword;
var opflag = context.getVariable("du.api.opflag");
if(opflag){
	inputJson.Opflag = opflag;	
}


context.setVariable("aes.json", JSON.stringify(inputJson));
