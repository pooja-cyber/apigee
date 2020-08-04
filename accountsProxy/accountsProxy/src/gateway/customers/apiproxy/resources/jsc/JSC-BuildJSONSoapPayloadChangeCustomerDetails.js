var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);

//Soap Request Payload
var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
			"web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
			"head" :"http://www.du.ae/LCE/Header" ,
			"lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"chan" :"http://xmlns.du.ae/LCE/Business/AccountManagement/ChangeCustomerDetails"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ChangeCustomerDetails":{
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
}; // End of soapPayload

context.setVariable("request.content", JSON.stringify(soapPayload));


function buildRequestBody(input){
	return{
		"chan:ContactDetails" : buildContactDetails(input.ContactDetails),
		"chan:AccountType":input.AccountType,
		"chan:MarketType":input.MarketType,
		"chan:InvoiceType":input.InvoiceType,
		"chan:InvoiceLanguage":input.InvoiceLanguage,
		"chan:Nationality":input.Nationality,
		"chan:VisaType":input.VisaType,
		"chan:VisaExpiryDate":input.VisaExpiryDate,
		"chan:VisaNumber":input.VisaNumber,
		"chan:CustomerID": context.getVariable("customerId"),
		"chan:DocumentNumber":input.DocumentNumber,
		"chan:DocumentType":input.DocumentType,
		"chan:DocumentIssueDate":input.DocumentIssueDate,
		"chan:DocumentExpireDate":input.DocumentExpireDate,
		"chan:PersonalizedOffers":input.PersonalizedOffers,
		"chan:BillCycle":input.BillCycle,
	}
}

function buildContactDetails(contactDetailsList){
	if (contactDetailsList) {
		return{
			"chan:UnifiedNumber" : contactDetailsList.UnifiedNumber,
			"chan:Address" : buildAddressList(contactDetailsList.Address),
			"chan:Email":contactDetailsList.Email,
			"chan:PhoneNumber":contactDetailsList.PhoneNumber,
			"chan:MonthlyIncome":contactDetailsList.MonthlyIncome,
			"chan:GuestMilesID":contactDetailsList.GuestMilesID
		}
	}else {
		return null;
	}
}

function buildAddressList(addressList){
	if (addressList) {
		return{
			"chan:Country": addressList.Country,
			"chan:StreetName":addressList.StreetName,
			"chan:Unit":addressList.Unit,
			"chan:PO_BOX":addressList.PO_BOX,
			"chan:Emirate":addressList.Emirate,
			"chan:City":addressList.City,
			"chan:Area":addressList.Area,
			"chan:Type":addressList.Type,
			"chan:AddressDetails1":addressList.AddressDetails1,
			"chan:AddressDetails2":addressList.AddressDetails2
		}
	} else {
		return null;
	}
}
