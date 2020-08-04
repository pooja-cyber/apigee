/**
 *  Extracts required input and converts the input into SOAP JSON
 *  SOAP JSON is set to request content
 */

var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);

if (input.SmartScriptQuestions) {
	var SmartScriptQuestionsArray = [];
	for(var i = 0;i<input.SmartScriptQuestions.length;i++){
		SmartScriptQuestionsArray.push(
			{
			"cre:Name" : input.SmartScriptQuestions[i].Name, 
			"cre:Value"  : input.SmartScriptQuestions[i].Value
			}
		);
	}
}

	var soapRequest = {
		"soapenv:Envelope":{
			"#namespaces": {
				"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
				"web" : "http://www.webservices.com/LCE/Du/WebServices",
				"head" : "http://www.du.ae/LCE/Header",
				"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
				"cre" : "http://xmlns.du.ae/LCE/Business/RequestManagement/CreateTT"
			},
			"soapenv:Header": {},
			"soapenv:Body":{
				"web:CreateTT":{
					"Request":{
						"head:Header":{
							"head:RequestId" : context.getVariable("du.api.requestId"),
							"head:Credentials":{
								"head:ApplicationId" : context.getVariable("du.config.applicationId"),
								"head:User" : context.getVariable("du.config.mceUsername"),
								"head:Password" : context.getVariable("du.config.mcePassword"),
							},
							"head:CorrelationId":"",
						},
						"lcew:Body" : {
							"cre:SrNumber" : input.SrNumber,
							"cre:AcctNumber" : input.AcctNumber,
							"cre:DocNumber" : input.DocNumber,
							"cre:DocType" : input.DocType,
							"cre:EntityType" : input.EntityType,
							"cre:Nationality" : input.Nationality,
							"cre:SrArea" : input.SrArea,
							"cre:SrDescription" : input.SrDescription,
							"cre:SrSubArea" : input.SrSubArea,
							"cre:SrType" : input.SrType,
							"cre:ServiceID" : input.ServiceID,
							"cre:ComNeeded" : input.ComNeeded,
							"cre:ExternalID" : input.ExternalID,
							"cre:ApOrderID" : input.ApOrderID,
							"cre:InvoiceNumber" : input.InvoiceNumber,
							"cre:B2bHeader": buildB2bHeaderObject(input.B2bHeader),
							"cre:SmartScriptQuestions": SmartScriptQuestionsArray,
						}
					}
				}
			}
		}
	}; //End of SOAP Payload
function buildB2bHeaderObject(headerRequestId){
	if (headerRequestId) {
		return{
			"cre:RequestID": input.B2bHeader.RequestID,
		}
	}
	else{
		return null;
	}
}
	
	 
	context.setVariable("request.content" , JSON.stringify(soapRequest));

	
