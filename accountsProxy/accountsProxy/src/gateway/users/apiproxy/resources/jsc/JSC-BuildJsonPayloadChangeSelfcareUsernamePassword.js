var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);
var soapJson = {
  "soapenv:Envelope": {
  	"#namespaces":{
  		"soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
    	"web": "http://webservice.thirdparties.ericsson.com/"
  	},
    "soapenv:Body": {
      "web:changeSelfcareUsernamePassword": {
        "ChangeSelfcareUsernamePasswordRequest": {
          "SelfcareCurrentUsername" : aesResponse.SelfcareCurrentUsername,
          "SelfcareCurrentPassword" : aesResponse.SelfcareCurrentPassword,
          "SelfcareNewUsername" : aesResponse.SelfcareNewUsername,
          "SelfcareNewPassword" : aesResponse.SelfcareNewPassword,
          "username" : aesResponse.username,
          "password" : aesResponse.password,
        }
      }
    }
  }
}

context.setVariable("request.content",JSON.stringify(soapJson));