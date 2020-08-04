var input = {}
var accountcode = context.getVariable("request.queryparam.account_code");
var msisdn = context.getVariable("request.queryparam.msisdn");
var orderid = context.getVariable("request.queryparam.orderid");

	if(accountcode){
		input.AccountCode = accountcode;
	}

	if(msisdn){
		input.Msisdn = msisdn;
	}

	if(orderid){
		input.OrderId = orderid;
	}


input = addNamespace(input, "mnp:");
var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"mnp" : "http://xmlns.du.ae/LCE/Business/RequestManagement/MNPGetRequestInfo"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:MNPGetRequestInfo":{
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
