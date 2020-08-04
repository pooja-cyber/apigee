var requestBody = context.getVariable("request.content");
requestBody = JSON.parse(requestBody);
var accesstoken_account = context.getVariable("accesstoken.customer_code");

var CustomerSegment = requestBody.CustomerSegment;
var AccountIntegrationId = requestBody.AccountIntegrationId;
var AccountCode = requestBody.AccountCode;

context.setVariable("du.api.accountCode",AccountCode);


var kvmFlag = context.getVariable("du.config.isManageOffersFlag")
var setFlag = 0;  

  if(!CustomerSegment){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'CustomerSegment is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();

  }else if(!AccountIntegrationId){
     context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'AccountIntegrationId is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}
   