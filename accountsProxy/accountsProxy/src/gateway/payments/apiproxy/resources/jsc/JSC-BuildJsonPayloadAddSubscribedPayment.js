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
			"web:addSubscribedPayment":{
				"AddSubscribedPaymentRequest": {
					"selfcareID": aesResponse.selfcareID,
					"username": aesResponse.username,
					"password": aesResponse.password,
					"customerID": aesResponse.customerID,
					"agentUserName": aesResponse.agentUserName,
					"channelID": aesResponse.channelID,
					"dstNickname": aesResponse.dstNickname,
					"paymentMethod": aesResponse.paymentMethod,
					"maxAmount": aesResponse.maxAmount,
				}
			}
		}
	}
};

context.setVariable("request.content",JSON.stringify(soapJson));
