var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);
var soapJson = {
  "soapenv:Envelope": {
    "#namespaces":{
  		"soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
    	"web": "http://webservice.thirdparties.ericsson.com/"
  	},
    "soapenv:Body": {
      "web:verifyCode": {
        "VerifyCodeRequest": {
          "SelfcareID": aesResponse.SelfcareID,
          "Opflag": aesResponse.Opflag,
          "verificationCode": aesResponse.verificationCode,
          "username": aesResponse.username,
          "password": aesResponse.password,
        }
      }
    }
  }
}

context.setVariable("request.content",JSON.stringify(soapJson));