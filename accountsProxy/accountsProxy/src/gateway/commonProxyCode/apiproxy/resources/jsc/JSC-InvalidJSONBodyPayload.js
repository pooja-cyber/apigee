/**
 * Check for JSON payload
 */

var jsonPayload = context.getVariable("request.content");
var message = "";
if(jsonPayload){
	try{
		var jsonPayload = JSON.parse(jsonPayload);
	}catch(e){
		message = "Invalid JSON payload." + e;
	}
}else{
	message = "Request content is empty. JSON payload is required.";
}

if(message){
	context.setVariable('api-error.error', 'BadRequestContent');
	context.setVariable('api-error.code', '400');
	context.setVariable('api-error.reason_phrase', 'Bad Request');
	context.setVariable('api-error.status_code', '400');
	context.setVariable('api-error.message', message);
	throw new Error()
}