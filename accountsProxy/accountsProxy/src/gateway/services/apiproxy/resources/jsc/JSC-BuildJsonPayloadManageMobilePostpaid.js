var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);

var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"man" :"http://xmlns.du.ae/LCE/Business/ServiceManagement/ManageMobilePostpaid"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManageMobilePostpaid":{
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
	var bodyPayload = {
		"man:ContractId" : input.ContractId,
		"man:ContractIdPub" : input.ContractIdPub,
		"man:Msisdn" : context.getVariable("msisdn"),
		"man:NewRpCode" : input.NewRpCode,
		"man:NewRpCodePub" : input.NewRpCodePub,
		"man:ListOfServices":buildListOfServices(input.ListOfServices),
		// Retrofitted Attributes
		"man:DealerID" : input.DealerID,
		"man:UserID" : input.UserID
		}
	bodyPayload =deleteNullUndefined(bodyPayload, "");
    return bodyPayload;
}

function buildListOfServices(list){
	if (list) {
		return{
			"man:Service": buildService(list.Service),
		}
	}
	else{
			return null;
		}
}

function buildService(serviceList){
	var serviceListArray = [];
	if (serviceList) {
		for (var i = 0; i < serviceList.length; i++) {
			serviceListArray.push({
				"man:SpCode" : serviceList[i].SpCode,
				"man:SpCodePub" : serviceList[i].SpCodePub,
				"man:SnCode" : serviceList[i].SnCode,
				"man:SnCodePub" : serviceList[i].SnCodePub,
			});
		}
	}
	return serviceListArray;
}

context.setVariable("request.content", JSON.stringify(soapPayload));
