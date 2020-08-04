var message = "";
var document_number = context.getVariable('request.queryparam.document_number');
var document_type = context.getVariable('request.queryparam.document_type');
var nationality = context.getVariable('request.queryparam.nationality');
var customer_id = context.getVariable('request.queryparam.customer_id');
var customer_code = context.getVariable('request.queryparam.customer_code');
var dir_num = context.getVariable('request.queryparam.dir_num');

if(document_number || document_type || nationality){
	switch(true){
		case !document_number:
			message = "Document Number is required parameter";
			break;
		case !document_type:
			message = "Document Type is required parameter";
			break;
		case !nationality:
			message = "Nationality is required parameter";
			break;
	}	
}else if(!customer_id && !customer_code && !dir_num){
	message = "One of customer_id, customer_code or dir_num is required";
}


if(message){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', message);
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
    
}