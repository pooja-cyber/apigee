var requestBody = context.getVariable("request.content");
requestBody = JSON.parse(requestBody);
var accesstoken_account = context.getVariable("accesstoken.customer_code");
var accesstoken_accountcode = context.getVariable("accesstoken.customer_code");

var Account = requestBody.Listeitcopportunity_Activityio.Opportunity.Account;
var AccountCode = requestBody.Listeitcopportunity_Activityio.Opportunity.AccountCode;
var Quantity = requestBody.Listeitcopportunity_Activityio.Opportunity.Quantity;
var ServiceType = requestBody.Listeitcopportunity_Activityio.Opportunity.ServiceType;
var ServiceSubType = requestBody.Listeitcopportunity_Activityio.Opportunity.ServiceSubType;

context.setVariable("du.api.Account",Account);
context.setVariable("du.api.AccountCode",AccountCode);
context.setVariable("du.api.Quantity",Quantity);
context.setVariable("du.api.ServiceType",ServiceType);
context.setVariable("du.api.ServiceSubType",ServiceSubType);
var kvmFlag = context.getVariable("du.config.isManageEnterpriseOpportunityFlag")
var setFlag = 0;  
  if(!Account && !AccountCode){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'Account or AccountCode is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();

  }



   if(kvmFlag == "true"){
      if (accesstoken_account) {
        var splitaccount= accesstoken_account.split(",");
        var splitaccountcode= accesstoken_accountcode.split(",");
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
                context.setVariable('api-error.message', 'Account does not match with Registered Account');
                context.setVariable('api-error.status_code', '401');
                context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
                throw new Error();
                
            }
        }

         if(AccountCode){
                 
                  for (var i=0;i<splitaccountcode.length;i++){
                      if(AccountCode == splitaccountcode[i]){
                          setFlag = 1;
                          break;
                      }
                  }
                  
                  if(setFlag!=1){
                      
                        context.setVariable('api-error.code', 'NB_40300');
                        context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
                        context.setVariable('api-error.message', 'AccountCode does not match with Registered AccountCode');
                        context.setVariable('api-error.status_code', '401');
                        context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
                        throw new Error();
                      
                  }

        }


      }else{
        context.setVariable('api-error.code', 'NB_40100');
        context.setVariable('api-error.error', 'AccountCodeisNotRegistered');
        context.setVariable('api-error.message', 'No Account Code was Registered');
        context.setVariable('api-error.status_code', '403');
        context.setVariable('api-error.reason_phrase', 'Forbidden Request ');
        throw new Error();
      }
  }

      
  