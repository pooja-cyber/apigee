var customerId = context.getVariable('customerId');
var customerCode = context.getVariable('request.queryparam.customer_code');
var customerIdPub = context.getVariable('request.queryparam.customer_id_pub');
/*ContractId Array*/
var contractId = request.queryParams["contract_id"];
var contractIdLength = request.queryParams["contract_id"].length();
/*contractIDPub Array*/ 
var contractIdPub = request.queryParams["contract_id_pub"];
var contractIdPubLength = request.queryParams["contract_id_pub"].length();


if(contractId || contractIDPub){
	var contractList = [];
			if(contractIdLength && contractIdPubLength){	

				for (var i = 0; i < contractIdLength; i++) {
						contractList.push(
						{ 
							"get:ContractID" : contractId[i],
							"get:ContractIDPub" : contractIdPub[i],
						}		
						); 
					}
			}else if(contractIdLength){

				for (var i = 0; i < contractIdLength; i++) {
						contractList.push(
						{ 
							"get:ContractID" : contractId[i],
							"get:ContractIDPub" : "",
						}		
						); 
					}
			}else if(contractIdPubLength){

				for (var i = 0; i < contractIdPubLength; i++) {
						contractList.push(
						{ 
							"get:ContractID" : "",
							"get:ContractIDPub" : contractIdPub[i],
						}		
						); 
					}
			}
}

var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"get" :"http://xmlns.du.ae/LCE/Business/RequestManagement/GetRequestHistory"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:GetRequestHistory":{
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
					"lcew:Body": {
						"get:CustomerCode": customerCode,
						"get:CustomerID" : customerId,
						"get:CustomerIDPub" : customerIdPub,
						"get:ContractList" : {
							"get:Contract" : contractList,
						}
					}
				}
			}
		}
	}
};


context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type", "application/json");
