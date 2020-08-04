var message = "";
var selfcare_id = context.getVariable("selfcareId");
var customer_id = context.getVariable('request.queryparam.customer_id');
var agent_username = context.getVariable('request.queryparam.agent_username');
var channel_id = context.getVariable('request.queryparam.channel_id');

if(selfcare_id || customer_id || agent_username || channel_id){
	switch(true){
		case !selfcare_id:
			message = "selfcare_id is required parameter";
			break;
		case !customer_id:
			message = "customer_id is required query parameter";
			break;
		case !agent_username:
			message = "agent_username is required query parameter";
			break;
		case !channel_id:
			message = "channel_id is required query parameter";
			break;
	}	
}


if(message){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', message);
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
    
}