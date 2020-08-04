var accountCode = context.getVariable('request.queryparam.account_code');
var msisdn = context.getVariable('request.queryparam.msisdn');
var orderid = context.getVariable('request.queryparam.order_id');

context.setVariable("du.api.accountCode",accountCode);
context.setVariable("orderId",orderid);


var accesstoken_account = context.getVariable("accesstoken.customer_code");
var accesstoken_msisdn = context.getVariable("accesstoken.msisdns");


var kvmFlag = context.getVariable("du.config.isMNPGetRequestInfoFlag")
var setFlag = 0;  
  if(!accountCode && !msisdn && !orderid){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'msisdn or account_code or orderid is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();

  }else if(kvmFlag == "true"){
    var splitaccount= accesstoken_account.split(",");
      var splitmsisdn= accesstoken_msisdn.split(",");
    if(accountCode){
       
        for (var i=0;i<splitaccount.length;i++){
            if(accountCode == splitaccount[i]){
                setFlag = 1;
                break;
            }
        }
        
        if(setFlag!=1){
            
              context.setVariable('api-error.code', 'NB_40300');
            context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
            context.setVariable('api-error.message', 'accountCode does not match with Registered accountCode');
            context.setVariable('api-error.status_code', '401');
            context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
            throw new Error();
            
        }
      else if(setFlag === 0){
        
              context.setVariable('api-error.code', 'NB_40300');
            context.setVariable('api-error.error', 'AccountCodeisNotRegistered');
            context.setVariable('api-error.message', 'No AccountCode was Registered');
            context.setVariable('api-error.status_code', '403');
            context.setVariable('api-error.reason_phrase', 'Forbidden Request');
            throw new Error();
        
    }
}
 if(msisdn){
         
          for (var i=0;i<splitmsisdn.length;i++){
              if(msisdn == splitmsisdn[i]){
                  setFlag = 1;
                  break;
              }
          }
          
          if(setFlag!=1){
              
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
                context.setVariable('api-error.message', 'msisdn does not match with Registered msisdn');
                context.setVariable('api-error.status_code', '401');
                context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
                throw new Error();
              
          }
      else if(setFlag === 0){
          
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'MSISDNisNotRegistered');
                context.setVariable('api-error.message', 'No msisdn was Registered');
                context.setVariable('api-error.status_code', '403');
                context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                throw new Error();
          
      }
}
      
  }
