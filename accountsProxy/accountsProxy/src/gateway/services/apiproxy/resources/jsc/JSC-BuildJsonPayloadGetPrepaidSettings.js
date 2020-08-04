var param_name = context.getVariable("request.queryparam.parameters");
if(param_name){
	var splitParam = param_name.split(",");
	if (splitParam) {
		var param_array=[];
		for(var i=0;i<splitParam.length;i++){
			param_array.push(
				{
						"get:PrmName" : splitParam[i],
				}
			);	
		}
	}
}


var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"get" :"http://xmlns.du.ae/LCE/Business/ServiceManagement/GetPrepaidSettings"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:GetPrepaidSettings":{
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
						"get:MSISDN": context.getVariable("msisdn"),
						"get:ServiceParmeterList": {
							"get:ServiceParmeterNode": param_array,
						}
					}
				}
			}
		}
		
	}
};


context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type","application/json");
