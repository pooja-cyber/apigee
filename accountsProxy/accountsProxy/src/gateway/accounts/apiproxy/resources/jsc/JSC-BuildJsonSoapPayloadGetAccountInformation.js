var input = {}
var accountcode = context.getVariable('accountNumber');
var msisdn = context.getVariable("request.queryparam.msisdn");


	if(accountcode){
		input.AccountCode = accountcode;
	}

	if(msisdn){
		input.MSISDN = msisdn;
	}

input = addNamespace(input, "get:");
var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" :"http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"get"  : "http://xmlns.du.ae/LCE/Business/AccountManagement/GetAccountInformation",
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:GetAccountInformation":{
				"Request":{
										
					"head:Header":{
						"head:RequestId": context.getVariable("du.api.requestId"),
						"head:Credentials":{
							"head:ApplicationId": context.getVariable("du.config.mceApplicationId"),
							"head:User": context.getVariable("du.config.mceUsername"),
							"head:Password": context.getVariable("du.config.mcePassword"),
						},
						"head:CorrelationId": "",
					},
					"lcew:Body": input
				}
			}
		}
	}
};

context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type", "application/json");
