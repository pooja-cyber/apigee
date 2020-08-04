var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);
// input.Account = [{AccountNumber : context.getVariable("accountNumber")}];


var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
			"man"  :"http://xmlns.du.ae/LCE/Business/AccountManagement/ManageContactMethod"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManageContactMethod":{
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
					"lcew:Body":
					 {
            "man:Account": { 
            	"man:AccountNumber": context.getVariable("accountNumber")
                           },
            "man:Contact": {
              "man:FirstName": input.Contact.FirstName,
              "man:LastName": input.Contact.LastName,
              "man:PreferredContactMethod": input.Contact.PreferredContactMethod
            }
				}
			}
		}
	}
}
}; // End of soapPayload

context.setVariable("request.content", JSON.stringify(soapPayload));
