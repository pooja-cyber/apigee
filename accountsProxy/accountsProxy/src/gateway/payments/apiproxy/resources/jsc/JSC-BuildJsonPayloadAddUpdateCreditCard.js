var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);
var soapJson = {
  "soapenv:Envelope": {
    "#namespaces":{
  		"soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
    	"web": "http://webservice.thirdparties.ericsson.com/"
  	},
    "soapenv:Header":{},
    "soapenv:Body": {
      "web:manageCreditCard": {
        "ManageCreditCardInformationRequest": {
          "SelfcareID":aesResponse.SelfcareID,
          "creditCardNumber" : aesResponse.creditCardNumber,
          "creditCardType" : aesResponse.creditCardType,
          "nameOnCard" : aesResponse.nameOnCard,
          "creditCardCVV" : aesResponse.creditCardCVV,
          "creditCardExpiryMonth" : aesResponse.creditCardExpiryMonth,
          "creditCardExpiryYear" : aesResponse.creditCardExpiryYear,
          "actionCode" : aesResponse.actionCode,
          "username" : aesResponse.username,
          "password" : aesResponse.password,
        }
      }
    }
  }
};

context.setVariable("request.content",JSON.stringify(soapJson));