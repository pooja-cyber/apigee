var accountNumber = context.getVariable('accountNumber');
var msisdn = context.getVariable('request.queryparam.msisdn');

if(!accountNumber && !msisdn){
	context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'One of the AccountNumber or msisdn is mandatory');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}