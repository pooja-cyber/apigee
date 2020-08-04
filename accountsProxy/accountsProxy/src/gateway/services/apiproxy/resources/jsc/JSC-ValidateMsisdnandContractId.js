var Contratcid = context.getVariable('request.queryparam.contract_id');
var msisdn = context.getVariable('request.queryparam.msisdn');
var accesstoken_msisdns = context.getVariable("accesstoken.msisdns");
var accesstoken_contractId = context.getVariable("accesstoken.contract_id");
// var isGetServiceStatusFlag = context.getVariable("du.config.isGetServiceStatusFlag");
var setFlag = 0;
var setCon_flag =0;


if(msisdn){
    if (accesstoken_msisdns) {
          var splitMsisdns= accesstoken_msisdns.split(",");
          if(splitMsisdns){
             
              for (var i=0;i<splitMsisdns.length;i++){
                  if(msisdn == splitMsisdns[i]){
                      setFlag = 1;
                      //context.setVariable('du.api.msisdn', msisdn);
                      break;
                  }
              }
              
              if(setFlag!=1){
                  
                    context.setVariable('api-error.code', 'NB_40300');
                    context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
                    context.setVariable('api-error.message', 'MSISDN does not match with Registered MSISDN');
                    context.setVariable('api-error.status_code', '403');
                    context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                    throw new Error();
                  
              }
          
          }
    }
    else{
          
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'MSISDNisNotRegistered');
                context.setVariable('api-error.message', 'No MSISDN was Registered');
                context.setVariable('api-error.status_code', '403');
                context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                throw new Error();
          
      }
        
    
}

if(Contratcid){
    if (accesstoken_contractId) {
       var splitContractId = accesstoken_contractId.split(",");
       if(splitContractId){
          for(var j=0;j<splitContractId.length;j++){
              if(Contratcid == splitContractId[j]){
                 setCon_flag =1;
                  // context.setVariable('du.api.Contratcid', Contratcid);
                  break;
              }
              
          }

          if(setCon_flag !=1){

                  context.setVariable('api-error.code', 'NB_40300');
                  context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
                  context.setVariable('api-error.message', 'Contract Id does not match with Registered Contract Id');
                  context.setVariable('api-error.status_code', '403');
                  context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                  throw new Error();
          }
      }
     } 
     else{

                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'ContractIdisNotRegistered');
                context.setVariable('api-error.message', 'No Contract Id was Registered');
                context.setVariable('api-error.status_code', '403');
                context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                throw new Error();

          } 
  }
