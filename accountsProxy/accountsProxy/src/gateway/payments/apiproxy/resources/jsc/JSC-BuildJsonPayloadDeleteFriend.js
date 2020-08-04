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
			"web:deleteFriend":{
				"DeleteFriendRequest": {
					"selfcareID": aesResponse.selfcareID,
					"username": aesResponse.username,
					"password": aesResponse.password,
					"customerID": aesResponse.customerID,
					"agentUserName": aesResponse.agentUserName,
					"channelID": aesResponse.channelID,
					"nickName": aesResponse.nickName,
				}
			}
		}
	}
};

context.setVariable("request.content",JSON.stringify(soapJson));
