var contract_id = context.getVariable("request.queryparam.contract_id");
var accesstoken_contract_id = context.getVariable("accesstoken.contract_id");
var setFlag =0; 
    if(!contract_id){
        context.setVariable('api-error.code', 'NB_40002');
        context.setVariable('api-error.error', 'MissingParameter');
        context.setVariable('api-error.message', 'Contract Id is required');
        context.setVariable('api-error.status_code', '400');
        context.setVariable('api-error.reason_phrase', 'Bad Request');
        throw new Error();

    }else{
      var splitContract_id= accesstoken_contract_id.split(",");
      if(splitContract_id){
         
          for (var i=0;i<splitContract_id.length;i++){
              if(contract_id == splitContract_id[i]){
                  setFlag = 1;
                  break;
              }
          }
          
          if(setFlag!=1){
              
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
                context.setVariable('api-error.message', 'Contract Id does not match with Registered Contract Id');
                context.setVariable('api-error.status_code', '403');
                context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                throw new Error();
              
          }
      
      }else{
          
                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'ContractIdisNotRegistered');
                context.setVariable('api-error.message', 'No Contract Id was Registered');
                context.setVariable('api-error.status_code', '403');
                context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                throw new Error();
          
      }
        
    }