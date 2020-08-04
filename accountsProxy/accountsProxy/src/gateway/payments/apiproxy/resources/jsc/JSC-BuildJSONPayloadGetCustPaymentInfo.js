//SOAP Payload 
var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);

var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
			"web": "http://webservice.thirdparties.ericsson.com/"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:getCustomerPaymentInformation":{
				"GetCustomerPaymentInformationRequest":{
					 "selfcareID": aesResponse.selfcareID,
			          "username": aesResponse.username,
			          "password": aesResponse.password,
			          "customerID": aesResponse.customerID,
			          "agentUserName": aesResponse.agentUserName,
			          "channelID": aesResponse.channelID,
				}
			}
		}
	}
}//End of SOAP Payload

context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type", "application/json");