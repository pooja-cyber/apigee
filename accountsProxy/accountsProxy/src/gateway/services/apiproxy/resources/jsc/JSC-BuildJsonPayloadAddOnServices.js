var addOn = request.queryParams["addOn"];
var addOnLength = request.queryParams["addOn"].length();

if(addOnLength){
	var addOnArray = [];
	for (var i = 0; i < addOnLength; i++) {
			addOnArray.push(
			{ 
				"get:addOn" : addOn[i],
			}		
			);
		}
}



var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"get" :"http://xmlns.du.ae/LCE/Business/ServiceManagement/GetApplicableAddOnServices"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:GetApplicableAddOnServices":{
				"Request":{
					"head:Header":{
						"head:RequestId": context.getVariable("du.api.requestId"),
						"head:Credentials":{
					        "head:ApplicationId":context.getVariable("du.config.applicationId"),
					        "head:User":context.getVariable("du.config.mceUsername"),
					        "head:Password":context.getVariable("du.config.mcePassword"),						    
						},
						"head:CorrelationId":"",
					},
					"lcew:Body": {
						"get:channel": context.getVariable("request.queryparam.channel"),
						"get:PreviewFlag": context.getVariable("request.queryparam.preview_flag"),
						"get:rateplan" : context.getVariable("request.queryparam.rateplan"),
						"get:currentAddons": addOnArray,
					}
				}
			}
		}	
	}
};


context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type","application/json");
