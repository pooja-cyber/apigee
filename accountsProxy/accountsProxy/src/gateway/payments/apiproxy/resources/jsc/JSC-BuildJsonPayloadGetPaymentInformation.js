//Soap Request Payload
var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"get" :"http://xmlns.du.ae/LCE/Business/AccountManagement/GetPaymentInformation"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:GetPaymentInformation":{
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
						"get:FromDate" : context.getVariable("request.queryparam.from_date"),
						"get:ToDate" : context.getVariable("request.queryparam.to_date"),
						"get:AccountNumber" : context.getVariable("request.queryparam.account_number"),
					}
				}
			}
		}
	}
};//End of Soap Payload

context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type", "application/json");
