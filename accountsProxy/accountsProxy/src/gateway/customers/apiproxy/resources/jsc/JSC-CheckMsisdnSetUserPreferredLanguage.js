var requestBody = context.getVariable("request.content");
requestBody = JSON.parse(requestBody);
var accesstoken_msisdns = context.getVariable("accesstoken.msisdns");
var msisdn = requestBody.DirNum;
var kvmFlag = context.getVariable("du.config.isSetUserPreferredLanguageFlag");

var setFlag =0;	
	if(!msisdn){
		context.setVariable('api-error.code', 'NB_40002');
		context.setVariable('api-error.error', 'MissingParameter');
		context.setVariable('api-error.message', 'DirNum is required');
		context.setVariable('api-error.status_code', '400');
		context.setVariable('api-error.reason_phrase', 'Bad Request');
		throw new Error();

	}else if(kvmFlag == "true"){
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
        		context.setVariable('api-error.reason_phrase', 'UnAuthorized Access');
        		throw new Error();
    	      
    	  }
	  
	  }else{
	      
	            context.setVariable('api-error.code', 'NB_40300');
        		context.setVariable('api-error.error', 'MSISDNisNotRegistered');
        		context.setVariable('api-error.message', 'No MSISDN was Registered');
        		context.setVariable('api-error.status_code', '403');
        		context.setVariable('api-error.reason_phrase', 'Forbidden Request');
        		throw new Error();
	      
	  }
	    
	}
