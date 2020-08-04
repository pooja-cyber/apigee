/**
 *  Extracts required input and converts the input into SOAP JSON
 *  SOAP JSON is set to request content
 */

var inputJson = context.getVariable('request.content');

try{
     
     var input = JSON.parse(inputJson);
     var soapRequest = createSoapPayload(input);
     context.setVariable("request.content" , JSON.stringify(soapRequest));
     
     
}catch(e){
	context.setVariable('api-error.error', 'BadInputPayload');
	context.setVariable('api-error.code', '400');
	context.setVariable('api-error.reason_phrase', 'BadInputPayload');
	context.setVariable('api-error.status_code', '400');
	context.setVariable('api-error.message', 'The requested payload is not a valid JSON');
	context.setVariable('api-error.exception', e);
	
	throw new Error();
}

function createSoapPayload(input){

	var entityInfo = input.subscriber_value;
	var entityInfoLength = entityInfo.length;
	var entityInfoArray =[];

	for(i=0;i<entityInfoLength;i++){
		entityInfoArray.push({
			"set:paramKey" : entityInfo[i].entity_key,
			"set:paramValue": entityInfo[i].entity_value
			});	

	}

	var levelList = input.account_level_info.level_list;
	var levelListLength = levelList.length;
	var levelListArray = [];

	for(j=0;j<levelListLength;j++){
		levelListArray.push({
			"set:level" : levelList[j].level,
			"set:sequenceNo" : levelList[j].sequence_no,
			"set:action" : levelList[j].action
			});

	}

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
        							"head:ApplicationId" : "",
        							"head:User" :username,
        							"head:Password" :password
        						},
        					"head:CorrelationId" : "" 
        				},
        			"lcew:Body" : {
        				"set:AccessSessionRequest" :{
        					"set:accessChannel" : "",
        					"set:beId" : "",
        					"set:language" : "",
        					"set:operatorCode" : "",
        					"set:password" : "",
        					"set:transactionId" : "",
        					"set:version" : ""
        				},
        			"set:SubscrberValue" :{
        				"set:entityInfo" : {
        						"set:entityInfo" :entityInfoArray
        					}
        				},
        			"set:AccountLevelInfos":{
        				"set:objectType" :"",
        				"set:accountObject" :"",
        				"set:levelList" : levelListArray 
        				}
        			}
				}
			}
		}
    }    
   }
   
   return soapRequest;
}
