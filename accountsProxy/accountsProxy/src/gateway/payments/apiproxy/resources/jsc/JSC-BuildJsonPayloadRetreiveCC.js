var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);

var soapJson = {
	"soapenv:Envelope":{
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://webservice.thirdparties.ericsson.com/"
		},
	"soapenv:Header":{},
		"soapenv:Body":{
			"web:retrieveCreditCardInfo":{
				"RetrieveCreditCardInformationRequest": {
					"SelfcareID": aesResponse.SelfcareID,
					"username": aesResponse.username,
					"password": aesResponse.password,
				}
			}
		}
	}
};

context.setVariable("request.content",JSON.stringify(soapJson));
context.setVariable("request.header.Content-Type", "application/json");