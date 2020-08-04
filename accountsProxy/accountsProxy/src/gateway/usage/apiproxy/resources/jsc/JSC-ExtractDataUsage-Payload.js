
     var inputJson = context.getVariable('request.content');
     var input = JSON.parse(inputJson);
     
     var requestId = context.getVariable("du.api.requestId");
	 var username = context.getVariable("du.config.mceUsername");
	 var password = context.getVariable("du.config.mcePassword");
     
     var soapRequest ={
    	"soapenv:Envelope" :{
            "#namespaces": {
						    "soapenv"   : "http://schemas.xmlsoap.org/soap/envelope/",
						    "web"       : "http://www.webservices.com/LCE/Du/WebServices",
						    "head"      : "http://www.du.ae/LCE/Header",
						    "lcew"      : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
						    "set"       : "http://xmlns.du.ae/LCE/Business/ServiceManagement/SetDataUsageNotificationThresholds"
					        },
		"soapenv:Header" : "",
		"soapenv:Body" :{
			"web:SetDataUsageNotificationThresholds":{
				"Request":{
					"head:Header":{
						  "head:RequestId" :requestId,
        						"head:Credentials" :{
        							"head:ApplicationId" : context.getVariable("du.config.applicationId"),
        							"head:User" :username,
        							"head:Password" :password
        						},
        					"head:CorrelationId" : "" 
        				},
        			"lcew:Body" :  buildRequestBody(input),
				}
			}
		}
    }    
   };
   
   context.setVariable("request.content", JSON.stringify(soapRequest));

   function buildRequestBody(input){

   var bodyPayload = {
   				"set:AccessSessionRequest" : buildAccessSession(input.AccessSessionRequest),
   				"set:SubscrberValue" : buildSubscriberValueObject(input.SubscrberValue),
   				"set:AccountLevelInfos" : bulidAccLevelInfos(input.AccountLevelInfos),

   		}

   	// 	bodyPayload =deleteNullUndefined(bodyPayload, "");
	    return bodyPayload;
   }

function buildAccessSession(AccessSessionRequest){

	if(AccessSessionRequest){
		return{
		"set:accessChannel" : AccessSessionRequest.accessChannel,
        "set:beId" : AccessSessionRequest.beId,
        "set:language" : AccessSessionRequest.language,
        "set:operatorCode" : AccessSessionRequest.operatorCode,
        "set:password" : AccessSessionRequest.password,
        "set:transactionId" : AccessSessionRequest.transactionId,
        "set:version" : AccessSessionRequest.version
    	}
	}else{
    	return null;
	    }
    
}


function buildSubscriberValueObject(subscriberObject){
	if (subscriberObject) {
		return{
			"set:entityInfo" : buildEntityInfo(subscriberObject.entityInfo),
		}
	} else {
		return null;
	}
}



function buildEntityInfo(entityArray){
	var entityInfoArray =[];

	if(entityArray){
	  	// var msisdn =  context.getVariable('msisdn'); 
		for(i=0;i<entityArray.length;i++){
			entityInfoArray.push({
				"set:paramKey" : entityArray[i].paramKey,
				"set:paramValue": entityArray[i].paramValue
				});	
		}
	}
	return entityInfoArray;
} 

function bulidAccLevelInfos(accountLevelInfos){

	if(accountLevelInfos){
		return{
			"set:objectType" : accountLevelInfos.objectType,
		    "set:accountObject" :accountLevelInfos.accountObject,
		    "set:levelList" : buildleavelist(accountLevelInfos.levelList),
		};
	}else{
		return null;
	}	

}


function buildleavelist(listArray){
	var levelListArray = [];
	if(listArray){

	for(j=0;j<listArray.length;j++){
		levelListArray.push({
			"set:level" : listArray[j].level,
			"set:sequenceNo" : listArray[j].sequenceNo,
			"set:action" : listArray[j].action
			});
	}
	return levelListArray;

	}
}