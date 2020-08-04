try{
    var responseString = context.getVariable('response.content');
    var soapRequestMethod = context.getVariable("du.config.soapMethodForResponse");
    // soapRequestMethod = "CreateTTResponse";
    var response = JSON.parse(responseString);
    var newResponse = response["Envelope"]["Body"][soapRequestMethod].return ? response["Envelope"]["Body"][soapRequestMethod].return : {};
    
    context.setVariable('response.content', JSON.stringify(newResponse));
}catch(e){
    context.setVariable('api-error.error', 'ServerError');
	context.setVariable('api-error.code', '500');
	context.setVariable('api-error.reason_phrase', 'Server Error');
	context.setVariable('api-error.status_code', '500');
	context.setVariable('api-error.message', 'Internal Server Error');
	context.setVariable('api-error.exception', e);
	throw new Error();
}