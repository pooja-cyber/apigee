var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson); 


var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"man" :"http://xmlns.du.ae/LCE/Business/ServiceManagement/ManagePrepaidLine"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManagePrepaidLine":{
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
		"man:MSISDN": context.getVariable("msisdn"),
		"man:EVENT_NAME": input.EVENT_NAME,
		"man:PARAMETER_LIST": buildParameterList(input.PARAMETER_LIST),
		"man:BOOSTER_PREF_NUMBERS": buildBoosterPrefNumbers(input.BOOSTER_PREF_NUMBERS),
		"man:ADJUSTMENT_CODE" : input.ADJUSTMENT_CODE,
            "man:EXT5" : input.EXT5,
            "man:EXT6" : input.EXT6,
	}
	bodyPayload =deleteNullUndefined(bodyPayload, "");
    return bodyPayload;
}

function buildParameterList(paramsList){
	if (paramsList) {
		return{
			"man:PARAMETER_NODE" : buildParameterNode(paramsList.PARAMETER_NODE),
		}
	}
	else{
		return null;
	}
}

function buildBoosterPrefNumbers(prefNumbList){
	if (prefNumbList) {
		return{
			"man:NUMBER": buildNumber(prefNumbList.NUMBER),
		}
	}
	else{
		return null;
	}
}

function buildNumber(numberList){
	var numberListArray = [];
	if (numberList) {
		for (var i = 0; i < numberList.length; i++) {
			numberListArray.push(
				numberList[i]
			);
		}
	}
	return numberListArray
}

function buildParameterNode(parameterList){
	var parameterListArray = [];
	if(parameterList){
		for (var i = 0; i < parameterList.length; i++) {
			parameterListArray.push({
				"man:PARAM_NAME" : parameterList[i].PARAM_VALUE,
				"man:PARAM_VALUE" : parameterList[i].PARAM_VALUE,
			});
		}
	}
	return parameterListArray
}
context.setVariable("request.content", JSON.stringify(soapPayload));
