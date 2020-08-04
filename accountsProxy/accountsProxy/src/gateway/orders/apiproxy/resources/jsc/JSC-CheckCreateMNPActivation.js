var requestBody = context.getVariable("request.content");
requestBody = JSON.parse(requestBody);
var accesstoken_account = context.getVariable("accesstoken.customer_code");

var Account = requestBody.AccountCode;
context.setVariable("du.api.accountCode",Account);


var kvmFlag = context.getVariable("du.config.isCreateMNPActivationFlag");
var setFlag = 0;  
  if(!Account){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'AccountCode is required');
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
            context.setVariable('api-error.message', 'AccountCode does not match with Registered Account Code');
            context.setVariable('api-error.status_code', '401');
            context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
            throw new Error();
            
        }

    


      
}



   }
   else {
        
            context.setVariable('api-error.code', 'NB_40300');
            context.setVariable('api-error.error', 'AccountisNotRegistered');
            context.setVariable('api-error.message', 'No AccountCode was Registered');
            context.setVariable('api-error.status_code', '403');
            context.setVariable('api-error.reason_phrase', 'Forbidden Request');
            throw new Error();
        
    }
}