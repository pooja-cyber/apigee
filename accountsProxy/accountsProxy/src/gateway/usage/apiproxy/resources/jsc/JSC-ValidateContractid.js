var Contratcid = context.getVariable('request.queryparam.contract_id');
var accesstoken_contractId = context.getVariable("accesstoken.contract_id");
var setCon_flag =0;
    if(accesstoken_contractId){
         var splitContractId = accesstoken_contractId.split(",");
         if(splitContractId){
            for(var j=0;j<splitContractId.length;j++){
                if(Contratcid == splitContractId[j]){
                   setCon_flag =1;
                    context.setVariable('du.api.Contratcid', Contratcid);
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
    }else{

                context.setVariable('api-error.code', 'NB_40300');
                context.setVariable('api-error.error', 'ContractIdisNotRegistered');
                context.setVariable('api-error.message', 'No Contract Id was Registered');
                context.setVariable('api-error.status_code', '403');
                context.setVariable('api-error.reason_phrase', 'Forbidden Request');
                throw new Error();

            } 
    
