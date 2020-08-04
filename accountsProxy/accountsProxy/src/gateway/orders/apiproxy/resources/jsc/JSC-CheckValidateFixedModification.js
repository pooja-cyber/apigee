var requestBody = context.getVariable("request.content");
requestBody = JSON.parse(requestBody);
var accesstoken_account = context.getVariable("accesstoken.customer_code");

var Account = requestBody.ListOfOrder.Order.Account;

var kvmFlag = context.getVariable("du.config.isValidateFixedModificationFlag")
var setFlag = 0;  
  if(!Account){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'Account ID is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();

  }

   if(kvmFlag == "true")
  {
    if(accesstoken_account)
    {
    var splitaccount= accesstoken_account.split(",");
     
    if(Account){
       
        for (var i=0;i<splitaccount.length;i++){
            if(Account == splitaccount[i]){
                setFlag = 1;
                break;
            }
        }
        
        if(setFlag!=1){
            
              context.setVariable('api-error.code', 'NB_40300');
            context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
            context.setVariable('api-error.message', 'Account ID does not match with Registered Account');
            context.setVariable('api-error.status_code', '401');
            context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
            throw new Error();
            
        }
     
}
   }
    else {
        
              context.setVariable('api-error.code', 'NB_40300');
            context.setVariable('api-error.error', 'AccountisNotRegistered');
            context.setVariable('api-error.message', 'No Account was Registered');
            context.setVariable('api-error.status_code', '403');
            context.setVariable('api-error.reason_phrase', 'Forbidden Request');
            throw new Error();
        
    }
}
