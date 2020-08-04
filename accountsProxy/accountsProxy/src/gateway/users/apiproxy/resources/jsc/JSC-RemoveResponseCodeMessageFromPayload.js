var responseJson = context.getVariable("response.content");
responseJson = JSON.parse(responseJson);
delete responseJson.responseCode;
delete responseJson.responseDescription;
if(Object.keys(responseJson).length > 0){
	context.setVariable("aes.input", JSON.stringify(responseJson))	
}else{
	context.setVariable("aes.response", JSON.stringify({}));
}

