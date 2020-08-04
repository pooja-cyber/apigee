var accesstoken_msisdns = context.getVariable("accesstoken.msisdns");
var msisdn = context.getVariable("request.queryparam.msisdn");
var setFlag =0; 
  if (accesstoken_msisdns) {
      var splitMsisdns= accesstoken_msisdns.split(",");
      if(splitMsisdns){
         
          for (var i=0;i<splitMsisdns.length;i++){
              if(msisdn == splitMsisdns[i]){
                  setFlag = 1;
                  break;
              }
          }
          
          if(setFlag!=1){
              
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
                context.setVariable('api-error.message', 'MSISDN does not match with Registered MSISDN');
                context.setVariable('api-error.status_code', '401');
                context.setVariable('api-error.reason_phrase', 'Unauthorized Access');
                throw new Error();
              
          }
      
      }
    }else{
          
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'MSISDNisNotRegistered');
                context.setVariable('api-error.message', 'No MSISDN was Registered');
                context.setVariable('api-error.status_code', '401');
                context.setVariable('api-error.reason_phrase', 'Unauthorized Request');
                throw new Error();
          
      }
        
    
