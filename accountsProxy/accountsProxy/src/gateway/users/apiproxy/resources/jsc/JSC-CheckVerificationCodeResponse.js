var message = "";
var responseCode = context.getVariable("calloutResponse.status.code");
	if(responseCode > 399){
		context.setVariable('api-error.message', 'OTP verification failed');
		context.setVariable('api-error.status_code', '403');
		context.setVariable('api-error.reason_phrase', 'Forbidden Request');
		context.setVariable('api-error.code', 'NB_40002');
		context.setVariable('api-error.error', 'InvalidOTPCode');	
		throw new Error();
	}
try{
	var payload = JSON.parse(context.getVariable("calloutResponse.content"));	
}catch(e){
	context.setVariable('api-error.message', 'JSON body invalid');
	context.setVariable('api-error.status_code', '400');
	context.setVariable('api-error.reason_phrase', 'Bad Request');
	context.setVariable('api-error.code', 'NB_40002');
	context.setVariable('api-error.error', 'InvalidJSONPayload');
	context.setVariable('api-error.exception', e);
	throw new Error();		
}

switch(payload.responseCode){
	case "0":
	case "?":
		//Validation successfull 
		break;
	default:
		message = "Verification code is invalid";
		break;
}
if(message){
	context.setVariable('api-error.message', payload.responseDescription);
	context.setVariable('api-error.status_code', '400');
	context.setVariable('api-error.reason_phrase', "Bad Request");
	context.setVariable('api-error.code', payload.responseCode);
	context.setVariable('api-error.error', 'BadRequest');
	throw new Error();	
}

