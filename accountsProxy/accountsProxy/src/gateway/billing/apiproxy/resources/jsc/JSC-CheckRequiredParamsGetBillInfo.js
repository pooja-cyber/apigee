var message = "";
var startDate = context.getVariable("request.queryparam.start_date");
var endDate = context.getVariable("request.queryparam.end_date");
var msisdn = context.getVariable("request.queryparam.msisdn");
var customerId = context.getVariable("request.queryparam.customer_id");
var contractId = context.getVariable("request.queryparam.contract_id");

switch(true){
    case !startDate:
        message = "Sart date is required parameter.";
        break;
    case !endDate:
        message = "End date is required parameter.";
        break;
}

if (message) {
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', message);
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
} else if(!msisdn && 
            !customerId && 
            !contractId) {
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message',"Anyone of MSISDN , Customer Id, Contract Id is required.");
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}