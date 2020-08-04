var pending_request_id = context.getVariable('request.queryparam.pending_request_id');

if(!pending_request_id){
	context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', "pending_request_id is required Query Parameter");
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}