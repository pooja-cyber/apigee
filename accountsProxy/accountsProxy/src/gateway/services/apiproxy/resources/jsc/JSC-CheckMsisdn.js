var msisdn = context.getVariable('request.queryparam.msisdn');

if(!msisdn){
	context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', "Msisdn is required Query Parameter");
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}