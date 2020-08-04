try{
	var responseString = context.getVariable('response.content');
	var response = JSON.parse(responseString);

}catch(e){
	context.setVariable('api-error.error', 'Internal ServerError');
	context.setVariable('api-error.code', '500');
	context.setVariable('api-error.reason_phrase', 'Intenal Server Error');
	context.setVariable('api-error.status_code', '500');
	context.setVariable('api-error.message', 'Internal Server Error');
	context.setVariable('api-error.exception', e);
	throw new Error()
}

switch(response.responseCode){
		case 501 :
		case 503 :
		case 506 :
			context.setVariable('api-error.error', response.responseDescription);
			context.setVariable('api-error.code', response.responseCode);
			context.setVariable('api-error.reason_phrase', 'Internal Server Error');
			context.setVariable('api-error.status_code', '500');
			context.setVariable('api-error.message', response.responseDescription);		
			throw new Error();
		case 502 :
			context.setVariable('api-error.error', response.responseDescription);
			context.setVariable('api-error.code', response.responseCode);
			context.setVariable('api-error.reason_phrase', "Unauthorized");
			context.setVariable('api-error.status_code', '401');
			context.setVariable('api-error.message', response.responseDescription);		
			throw new Error();

		case 505 :
		case 552 :
		case 554 :
		case 557 :
			context.setVariable('api-error.error', response.responseCode);
			context.setVariable('api-error.code', response.responseCode);
			context.setVariable('api-error.reason_phrase', 'Not Found');
			context.setVariable('api-error.status_code', '404');
			context.setVariable('api-error.message', response.responseDescription);
			throw new Error();
		
		case 556 :
			context.setVariable('api-error.error', response.responseCode);
			context.setVariable('api-error.code', response.responseCode);
			context.setVariable('api-error.reason_phrase', 'Forbidden');
			context.setVariable('api-error.status_code', '403');
			context.setVariable('api-error.message', response.responseDescription);
			throw new Error();
		case 504 :
		case 507 :
		case 508 :
		case 500 :
		case 520 :
		case 521 :
		case 522 :
		case 523 :
		case 553 :
		case 555 :
		case 558 :
		case 570 :
		case 571 :
		case 580 :
		case 581 :
		case 590 :
		case 591 :
		case 593 :
			context.setVariable('api-error.error', response.responseDescription);
			context.setVariable('api-error.code', response.responseCode);
			context.setVariable('api-error.reason_phrase', 'Bad Request');
			context.setVariable('api-error.status_code', '400');
			context.setVariable('api-error.message', response.responseDescription);		
			throw new Error();
			
		case 0 :
		case "?": 
			//Do nothing its success response
			break;
		default:
			context.setVariable('api-error.error', response.responseDescription);
			context.setVariable('api-error.code', response.responseCode);
			context.setVariable('api-error.reason_phrase', 'Internal Server Error');
			context.setVariable('api-error.status_code', '500');
			context.setVariable('api-error.message', response.responseDescription);		
			throw new Error();
			break;
	}
