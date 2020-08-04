/**
 *  Extracts required input and converts the input into SOAP JSON
 *  SOAP JSON is set to request content
 */

var inputJson = context.getVariable('request.content');
var input = JSON.parse(inputJson);

    var soapRequest ={
    	"soapenv:Envelope" :{
            "#namespaces": {
						    "soapenv"   : "http://schemas.xmlsoap.org/soap/envelope/",
						    "web"       : "http://www.webservices.com/LCE/Du/WebServices",
						    "head"      : "http://www.du.ae/LCE/Header",
						    "lcew"      : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
						    "man"       : "http://xmlns.du.ae/LCE/Business/AccountManagement/ManageCustomerProfileInfo"
					        },
		"soapenv:Header" : "",
		"soapenv:Body" :{
			"web:ManageCustomerProfileInfo" :{
				"Request":{
					"head:Header":{
						"head:RequestId" : context.getVariable("du.api.requestId"),
						"head:Credentials" : {
							"head:ApplicationId" : context.getVariable("du.config.applicationId"),
							"head:User" : context.getVariable("du.config.mceUsername"),
							"head:Password" : context.getVariable("du.config.mcePassword"),
						},
						"head:CorrelationId" : "",
					},
					"lcew:Body" : buildRequestBody(input),
					}
				},
			},
			
		}
    };

context.setVariable("request.content", JSON.stringify(soapRequest));

function buildRequestBody(input){
	return{
		"man:Customer": buildCustomer(input.Customer),
		"man:BSCSConType" : input.BSCSConType,
	}
}

function buildCustomer(customerList){
	if (customerList) {
		return{
		"man:CustomerID": context.getVariable("customerId"),
		"man:Type": customerList.Type,
		"man:MonthlyCustomerIncome": customerList.MonthlyCustomerIncome,
		"man:SuppressMarketingCallsFlag": customerList.SuppressMarketingCallsFlag,
		"man:BillDeliveryMethod": customerList.BillDeliveryMethod,
		"man:AlternateContactNumber": customerList.AlternateContactNumber,
		"man:IdentificationDocument" : buildIdentificationDocument(customerList.IdentificationDocument),
		"man:Contact": buildContact(customerList.Contact),
		}
	}
	else{
		return null;
	}
}

function buildIdentificationDocument(documentList){
	var documentListArray = [];
		if(documentList){
			for (var i = 0; i < documentList.length; i++) {
				documentListArray.push({
					"man:DocumentType": documentList[i].DocumentType,
					"man:DocumentNumber": documentList[i].DocumentNumber,
					"man:ExpireDate": documentList[i].ExpireDate,
					"man:PlaceOfIssue": documentList[i].PlaceOfIssue,
				});
			}
		}
	return documentListArray;
}

function buildContact(contactList){
	var contactListArray = [];
	if(contactList){
		for (var i = 0; i < contactList.length; i++) {
			contactListArray.push({
				"man:FirstName": contactList[i].FirstName,
				"man:MiddleName1": contactList[i].MiddleName1,
				"man:MiddleName2": contactList[i].MiddleName2,
				"man:FamilyName": contactList[i].FamilyName,
				"man:Title": contactList[i].Title,
				"man:BirthDate": contactList[i].BirthDate,
				"man:Nationality": contactList[i].Nationality,
				"man:Gender": contactList[i].Gender,
				"man:MaritalStatus": contactList[i].MaritalStatus,
				"man:CompanyName": contactList[i].CompanyName,
				"man:CompanyRegistrationNumber": contactList[i].CompanyRegistrationNumber,
				"man:JobDescription": contactList[i].JobDescription,
				"man:Department": contactList[i].Department,
				"man:HomePhone": contactList[i].HomePhone,
				"man:WorkPhone": contactList[i].WorkPhone,
				"man:CellularPhone": contactList[i].CellularPhone,
				"man:FaxPhone": contactList[i].FaxPhone,
				"man:EmailAddress": contactList[i].EmailAddress,
				"man:Language": contactList[i].Language,
				"man:SmsNumber": contactList[i].SmsNumber,
				"man:ExtendedInfoList": buildExtendedInfoObject(contactList[i].ExtendedInfoList),
				"man:Address": buildAddress(contactList[i].Address),

			});
		}
	}
return contactListArray;
}


function buildExtendedInfoObject(infoObject){
	if (infoObject) {
		return{
		"man:ExtendedInfo" : buildExtendedInfo(infoObject.ExtendedInfo), 
		}
	}
	else{
		return null;
	}
}

function buildExtendedInfo(infoList){
var infoListArray = [];
	if(infoList){
		for (var i = 0; i < infoList.length; i++) {
			infoListArray.push({
				"man:InfoShdes": infoList[i].InfoShdes,
				"man:InfoValue": infoList[i].InfoValue,
			});
		}
	}
return infoListArray;
}

function buildAddress(addressList){
	var addressListArray = [];
	if(addressList){
		for (var i = 0; i < addressList.length; i++) {
			addressListArray.push({
				"man:AddressSequence": addressList[i].AddressSequence,
				"man:AddressType": addressList[i].AddressType,
				"man:POBox": addressList[i].POBox,
				"man:AddressDetail1": addressList[i].AddressDetail1,
				"man:AddressDetail2": addressList[i].AddressDetail2,
				"man:AddressDetail3": addressList[i].AddressDetail3,
				"man:StreetName": addressList[i].StreetName,
				"man:Area": addressList[i].Area,
				"man:Number": addressList[i].Number,
				"man:Floor": addressList[i].Floor,
				"man:BuildingName": addressList[i].BuildingName,
				"man:City": addressList[i].City,
				"man:EMIRate": addressList[i].EMIRate,
				"man:Country": addressList[i].Country,
				"man:YearsAtAddress": addressList[i].YearsAtAddress,
				"man:InternationalZipCode": addressList[i].InternationalZipCode,
				"man:ContactLocationKey": addressList[i].ContactLocationKey,
			});
		}
	}
	return addressListArray;
}