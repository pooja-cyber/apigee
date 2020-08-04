var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);


var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"man" :"http://xmlns.du.ae/LCE/Business/ServiceManagement/ManagePostpaidDataBundles"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManagePostpaidDataBundles":{
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
					"lcew:Body": buildRequestBody(input),
				}
			}
		}
	}
};

function buildRequestBody(input){
	return{
		"man:MSISDN" : context.getVariable("msisdn"),
		"man:BundleType" : input.BundleType,
		"man:ServiceCodePub" : input.ServiceCodePub,
		"man:ParameterValueDes" : input.ParameterValueDes,
		"man:ActionCode" : input.ActionCode,
	}
}

context.setVariable("request.content", JSON.stringify(soapPayload));
