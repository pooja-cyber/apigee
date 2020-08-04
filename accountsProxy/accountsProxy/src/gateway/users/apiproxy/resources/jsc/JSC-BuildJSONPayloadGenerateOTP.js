var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);
var soapJson = {
  "soapenv:Envelope": {
    "#namespaces":{
  		"soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
    	"web": "http://webservice.thirdparties.ericsson.com/"
  	},
    "soapenv:Body": {
      "web:registerSelfcareUser": {
        "RegisterSelfcareUserRequest": {
          "SelfcareID": aesResponse.SelfcareID,
          "username": aesResponse.username,
          "password": aesResponse.password,
          "Opflag": aesResponse.Opflag,
          "SelfcareUsername": aesResponse.SelfcareUsername,
          "SelfcarePassword": aesResponse.SelfcarePassword,
        }
      }
    }
  }
}

context.setVariable("request.content",JSON.stringify(soapJson));