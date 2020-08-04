try{
	var responseString = context.getVariable('response.content');
	var response = JSON.parse(responseString);
	response.ErrorDescription = response.ErrorDescription ? response.ErrorDescription:response.ResponseMessage;
		

}catch(e){
	context.setVariable('api-error.error', 'Internal ServerError');
	context.setVariable('api-error.code', '500');
	context.setVariable('api-error.reason_phrase', 'Intenal Server Error');
	context.setVariable('api-error.status_code', '500');
	context.setVariable('api-error.message', 'Internal Server Error');
	context.setVariable('api-error.exception', e);
	throw new Error()
}

switch(response.ResponseCode){
		case "-100" :
		case -100 :
		case "-102" :
		case -102 :
			context.setVariable('api-error.error', response.ErrorDescription);
			context.setVariable('api-error.code', response.ResponseCode);
			context.setVariable('api-error.reason_phrase', 'Not Found');
			context.setVariable('api-error.status_code', '404');
			context.setVariable('api-error.message', response.ErrorDescription);
			throw new Error();		
			break;
		case "-300":
		case  -300 :
		case "-400":
		case  -400 :
		case "-500":
		case  -500 :
		case "-502":
		case  -502 :
		case "-802":
		case  -802 :
			context.setVariable('api-error.error', response.ErrorDescription);
			context.setVariable('api-error.code', response.ResponseCode);
			context.setVariable('api-error.reason_phrase', 'Bad Request');
			context.setVariable('api-error.status_code', '400');
			context.setVariable('api-error.message', response.ErrorDescription);		
			throw new Error();
			break;
		case "-200" :
		case   -200 :
		case "-600" :
		case   -600 :
		case "-601" :
		case   -601 :
		case "-602" :
		case   -602 :
		case "-700" :
		case   -700 :
		case "-800" :
		case   -800 :
			context.setVariable('api-error.error', response.ErrorDescription);
			context.setVariable('api-error.code', response.ResponseCode);
			context.setVariable('api-error.reason_phrase', 'Internal Server Error');
			context.setVariable('api-error.status_code', '500');
			context.setVariable('api-error.message', response.ErrorDescription);		
			throw new Error();
			break;
		case "0" :
		case  0 :
		case "?" :
		case "" :
			//Do nothing its success response
			break;
		default:
			context.setVariable('api-error.error', response.ErrorDescription);
			context.setVariable('api-error.code', response.ResponseCode);
			context.setVariable('api-error.reason_phrase', 'Internal Server Error');
			context.setVariable('api-error.status_code', '500');
			context.setVariable('api-error.message', response.ErrorDescription);		
			throw new Error();
			break;
	}
