var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);


var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"man" :"http://xmlns.du.ae/LCE/Business/ServiceManagement/ManagePrepaidTopUp"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManagePrepaidTopUp":{
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
		"man:TransactionId" : input.TransactionId,
		"man:MSISDN" : context.getVariable("msisdn"),
		"man:Amount" : input.Amount,
		"man:Channel" : input.Channel,
		"man:PaymentType" : input.PaymentType,
		"man:BalanceType" : input.BalanceType,
		"man:BalanceExpiry" : input.BalanceExpiry,
		"man:UserID" : input.UserID,
		"man:AmountDecimal" : input.AmountDecimal,
		"man:ChargeMode" : input.ChargeMode,
		"man:IMEI" : input.IMEI,
		"man:Scenario" : input.Scenario,
		"man:IpAddress" : input.IpAddress,
		"man:Cost" : input.Cost,
	}
}

context.setVariable("request.content", JSON.stringify(soapPayload));
