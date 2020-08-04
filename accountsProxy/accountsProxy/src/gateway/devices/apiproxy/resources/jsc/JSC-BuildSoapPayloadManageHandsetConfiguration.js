
var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"man" :"http://xmlns.du.ae/LCE/Business/ResourceManagement/ManageHandsetConfiguration"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManageHandsetConfiguration":{
				"Request":{
	
					"head:Header":{
						"head:RequestId": context.getVariable("du.api.requestId"),
						"head:Credentials":{
					        "head:ApplicationId":context.getVariable("du.config.mceApplicationId"),
					        "head:User":context.getVariable("du.config.mceUsername"),
					        "head:Password":context.getVariable("du.config.mcePassword"),						    
						},
						"head:CorrelationId":"",
					},
					"lcew:Body": 
					{

                        "man:MSISDN" : context.getVariable("msisdn"),
                        "man:IMEI" : context.getVariable("request.queryparam.imei"),
                        "man:NamedConfiguration" : context.getVariable("request.queryparam.named_configuration")
					}
				}
			}
		}
	}
}; // End of soapPayload

context.setVariable("request.content", JSON.stringify(soapPayload));

