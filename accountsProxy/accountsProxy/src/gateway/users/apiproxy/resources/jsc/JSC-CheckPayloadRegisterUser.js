var message = "";
try{
	var payload = JSON.parse(context.getVariable("request.content"));	
}catch(e){
	context.setVariable('api-error.message', 'JSON body invalid');
	context.setVariable('api-error.status_code', '400');
	context.setVariable('api-error.reason_phrase', 'Bad Request');
	context.setVariable('api-error.code', 'NB_40002');
	context.setVariable('api-error.error', 'InvalidJSONPayload');
	context.setVariable('api-error.exception', e);
	throw new Error();		
}


switch(true){
	case !payload.SelfcareID:
		message = "Selfacer Id is required in body payload";
		break;
	case !payload.SelfcareUsername:
		message = "Username is required in body payload";
		break;
	case !payload.SelfcarePassword:
		message = "Password is required in body payload";
		break;
	case !payload.verificationCode:
		message = "Verification Code is required in body payload";
		break;
}
if(message){
	context.setVariable('api-error.message', message);
	context.setVariable('api-error.status_code', '400');
	context.setVariable('api-error.reason_phrase', 'Bad Request');
	context.setVariable('api-error.code', 'NB_40002');
	context.setVariable('api-error.error', 'MissingParameter');
	throw new Error();	
}

