
var type = context.getVariable('request.queryparam.type');
context.setVariable("du.api.type",type);

if(!type)
{
	context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'type  is  required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
    

}