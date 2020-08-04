var accesstoken_contractId = context.getVariable("accesstoken.contract_id");
var contractId = context.getVariable("contractId");
var kvmFlag = context.getVariable("isGetContractRatePlanHistoryFlag");
var setFlag =0;	
	if(!contractId){
		context.setVariable('api-error.code', 'NB_40002');
		context.setVariable('api-error.error', 'MissingParameter');
		context.setVariable('api-error.message', 'Contract Id is required');
		context.setVariable('api-error.status_code', '400');
		context.setVariable('api-error.reason_phrase', 'Bad Request');
		throw new Error();

	}else if ( kvmFlag == "true"){
	  var splitcontractId= accesstoken_contractId.split(",");
	  if(splitcontractId){
	     
    	  for (var i=0;i<splitcontractId.length;i++){
    	      if(contractId == splitcontractId[i]){
    	          setFlag = 1;
    	          break;
    	      }
    	  }
    	  
    	  if(setFlag!=1){
    	      
            	context.setVariable('api-error.code', 'NB_40300');
        		context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
        		context.setVariable('api-error.message', 'Contract Id does not match with Registered Contract Id');
        		context.setVariable('api-error.status_code', '401');
        		context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
        		throw new Error();
    	      
    	  }
	  
	  }else{
	      
	            context.setVariable('api-error.code', 'NB_40300');
        		context.setVariable('api-error.error', 'contractIdisNotRegistered');
        		context.setVariable('api-error.message', 'No Contract Id was Registered');
        		context.setVariable('api-error.status_code', '403');
        		context.setVariable('api-error.reason_phrase', 'Forbidden Request');
        		throw new Error();
	      
	  }
	    
	}
