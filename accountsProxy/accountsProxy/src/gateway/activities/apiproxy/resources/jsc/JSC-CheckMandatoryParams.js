var activityId = context.getVariable('activityId');
var id = context.getVariable('id');
var accountId = context.getVariable('accountId');

if(!activityId && !id && !accountId){
    context.setVariable('api-error.code', 'NB_40000');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'Any one of ActivityId,AccountId or Id is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}