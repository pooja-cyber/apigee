 /**
 *  Extracts required input and converts the input into SOAP JSON
 *  SOAP JSON is set to request content
 */

var msisdn = context.getVariable("msisdn");
var requestId = context.getVariable("du.api.requestId");
var username = context.getVariable("du.config.mceUsername");
var password = context.getVariable("du.config.mcePassword");
var WalletType = context.getVariable("request.queryparam.wallet_type");
context.setVariable("request.header.Content-Type", "application/json");
if(!WalletType){
    WalletType ="";
}
var MaxRecords = context.getVariable("request.queryparam.max_records");
if(!MaxRecords){
    MaxRecords ="";
}
var Days = context.getVariable("request.queryparam.days");
if(!Days){
    Days ="";
}
var StartDate = context.getVariable("request.queryparam.start_date");
if(!StartDate){
    StartDate = "";
}
var EndDate = context.getVariable("request.queryparam.end_date");

if(!EndDate){
    EndDate ="";
}

var EdrType = context.getVariable("request.queryparam.edr_types");
var EdrTypeArray = [];
if(EdrType){
var EdrTypeSplit = EdrType.split(",");
var EdrTypeLength = EdrTypeSplit.length;

for(i=0; i<EdrTypeLength; i++){
 EdrTypeArray.push(EdrTypeSplit[i]);
}

}else{
    EdrTypeArray = "";
}
	var soapRequest ={
		"soapenv:Envelope" :{
            "#namespaces": {
						    "soapenv"   : "http://schemas.xmlsoap.org/soap/envelope/",
						    "web"       : "http://www.webservices.com/LCE/Du/WebServices",
						    "head"      : "http://www.du.ae/LCE/Header",
						    "lcew"      : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
						    "prep"       : "http://xmlns.du.ae/LCE/Business/ServiceManagement/PrepaidGetUsage"
					        },
		"soapenv:Header":"",
		"soapenv:Body":{
			"web:PrepaidGetUsage":{
				"Request":{
					"head:Header":{
						"head:RequestId":requestId,
						"head:Credentials":{
							"head:ApplicationId":context.getVariable("du.config.applicationId"),
							"head:User":username,
							"head:Password":password,
							
						},
						"head:CorrelationId":"",
					},

					"lcew:Body":{
						"prep:Msisdn":msisdn,
						"prep:EdrTypes" : {
						    "prep:EdrType" :EdrTypeArray
						},
						"prep:WalletType" : WalletType,
						"prep:MaxRecords" : MaxRecords,
						"prep:Days" : Days,
						"prep:StartDate" : StartDate,
						"prep:EndDate" : EndDate
					    }
				    }
				}
		    }
	    }
	};

	context.setVariable("request.content" , JSON.stringify(soapRequest));