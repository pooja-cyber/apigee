var response = context.getVariable("response.content");
var response = JSON.parse(response);

delete response.responseCode;
delete response.responseDescription;

// context.setVariable("response.content",JSON.stringify(response));

if(Object.keys(response).length > 0){
	context.setVariable("aes.input", JSON.stringify(response))	
}else{
	context.setVariable("aes.response", JSON.stringify({}));
}