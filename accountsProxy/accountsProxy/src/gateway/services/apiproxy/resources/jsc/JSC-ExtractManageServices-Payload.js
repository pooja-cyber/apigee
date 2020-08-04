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
						    "man"       : "http://xmlns.du.ae/LCE/Business/ServiceManagement/ManageServices"
					        },
		"soapenv:Header" : "",
		"soapenv:Body" :{
			"web:ManageServices" :{
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

function buildRequestBody(input){
	var bodyPayload = {
		"man:RequestAction": input.RequestAction,
		"man:ContractID": input.ContractID,
		"man:ServiceList": buildServiceList(input.ServiceList),
		"man:ContractIDPub": input.ContractIDPub,
		"man:GenericDirectoryNumberCreate":buildGenericDirectoryNumber(input.GenericDirectoryNumberCreate),
		"man:BillingAccount":buildBillingAccount(input.BillingAccount),
		"man:BscsConType": input.BscsConType,
        "man:CoType": input.CoType,
        "man:Action": input.Action,
	}
		bodyPayload =deleteNullUndefined(bodyPayload, "");
	    return bodyPayload;
}

function buildServiceList(serviceListObject){
	if (serviceListObject) {
		return{
		"man:ServiceNode": buildServiceNode(serviceListObject.ServiceNode),
		}
	}
	else{
		return null;
	}
}
   
   function buildServiceNode(nodeList){
   	var serviceNodeArray = [];
	   	if(nodeList){
		   	for(var i = 0; i <nodeList.length; i++){
		   		serviceNodeArray.push(
			   			{
			   				"man:ProfileID": nodeList[i].ProfileID,
			   				"man:ServiceAction": nodeList[i].ServiceAction,
			   				"man:ServiceActionDate": nodeList[i].ServiceActionDate,
			   				"man:ParamConfigReq": nodeList[i].ParamConfigReq,
			   				"man:ResConfigReq": nodeList[i].ResConfigReq,
			   				"man:ServiceID": nodeList[i].ServiceID,
			   				"man:ServicePackageCode": nodeList[i].ServicePackageCode,
			   				"man:ServiceParameterList": buildServiceParameterListObject(nodeList[i].ServiceParameterList),
			   				"man:ServiceResourceList": buildServiceResourceListObject(nodeList[i].ServiceResourceList),
			   				"man:ServiceIDPub": nodeList[i].ServiceIDPub,
			   				"man:ServicePackageCodePub": nodeList[i].ServicePackageCodePub,
			   				"man:Resource": nodeList[i].Resource,
			   				"man:ResourceId": nodeList[i].ResourceId,
			   				"man:ExternalServiceID": nodeList[i].ExternalServiceID,
			   				"man:ExternalServiceIDPub": nodeList[i].ExternalServiceIDPub,
			   				"man:OperatorAssistedAction": nodeList[i].OperatorAssistedAction,
			   				"man:TemaplteID": nodeList[i].TemaplteID,
			   				"man:OneTimeCharge": nodeList[i].OneTimeCharge,
			   				"man:OneTimeChargeType": nodeList[i].OneTimeChargeType,
			   				"man:RecurringCharge": nodeList[i].RecurringCharge,
			   				"man:RecurringChargeType": nodeList[i].RecurringChargeType,
			   				"man:RecurringChargePeriod": nodeList[i].RecurringChargePeriod,
			   				"man:AdvanceRecurringCharge": nodeList[i].AdvanceRecurringCharge,
			   				"man:AdvanceRecurringChargeType": nodeList[i].AdvanceRecurringChargeType,
			   				"man:AdvanceRecurringChargePeriod": nodeList[i].AdvanceRecurringChargePeriod,
			   				"man:ServiceQuantity": nodeList[i].ServiceQuantity,
			   				"man:ServiceTrialEndDate": nodeList[i].ServiceTrialEndDate,
			   				"man:CugAction": nodeList[i].CugAction,
			   				"man:CustomerPaymentConditionUsageIndicator": nodeList[i].CustomerPaymentConditionUsageIndicator,
			   				"man:CustomerPrepaidTpID": nodeList[i].CustomerPrepaidTpID,
			   				"man:CustomerPrepaidTpIdPub": nodeList[i].CustomerPrepaidTpIdPub,
			   				"man:CugMemberships": buildCugMemberships(nodeList[i].CugMemberships),
			   				"man:BsgConfiguration" : buildBsgConfiguration(nodeList[i].BsgConfiguration),
			   			}
		   			);
		   	}
	   }
	   return serviceNodeArray;
   }

function buildServiceParameterListObject(parameterListObject){
	if (parameterListObject) {
		return{
			"man:ServiceParameterListNode" : buildServiceParameterListNode(parameterListObject.ServiceParameterListNode),
		}
	} else {
		return null;
	}
}

function buildServiceResourceListObject(resourceListObject){
	if (resourceListObject) {
		return{
			"man:ServiceResourceNode": buildServiceResourceNode(resourceListObject.ServiceResourceNode),
		}
	} else {
		return null;
	}
}

function buildServiceParameterListNode(parameterNodeList){
	var parameterNodeListArray = [];
	if(parameterNodeList){
	for(var i = 0; i <parameterNodeList.length;i++){
	parameterNodeListArray.push(
			{
				"man:PrmNo": parameterNodeList[i].PrmNo,
				"man:PrmType": parameterNodeList[i].PrmType,
				"man:PrmAction": parameterNodeList[i].PrmAction,
				"man:ValueList": buildValueList(parameterNodeList[i].ValueList),
				"man:ValueNode" : buildValueNode(parameterNodeList[i].ValueNode),
			}
		);
		}
	}
	return parameterNodeListArray;

}

function buildValueList(valueListObject){
	if (valueListObject) {
		return{
			"man:ValueNode" : buildValueNode(valueListObject.ValueNode),
		}
	} else {
		return null;
	}
	
}

function buildValueNode(valueNodeList){
	var valueNodeListArray = [];
	if(valueNodeList){
		for(var i = 0; i<valueNodeList.length;i++){
			valueNodeListArray.push(
				{
					"man:PrmValuePub": valueNodeList[i].PrmValuePub,
					"man:PrmValidFrom": valueNodeList[i].PrmValidFrom,
					"man:PrmValue": valueNodeList[i].PrmValue,
					"man:PrmValueDes": valueNodeList[i].PrmValueDes,
					"man:PrmValueSeqNo":valueNodeList[i].PrmValueSeqNo,
				}
				);
		}
	}
	return valueNodeListArray;
}

function buildServiceResourceNode(resourceNodeList){
	var resourceNodeListArray = [];
	if(resourceNodeList){
		for(var i = 0; i<resourceNodeList.length;i++){
			resourceNodeListArray.push(
				{	
					"man:ExtServiceID": resourceNodeList[i].ExtServiceID,
					"man:ExtServiceIDPub": resourceNodeList[i].ExtServiceIDPub,
					"man:DirectoryNumbers": buildDirectoryNumbers(resourceNodeList[i].DirectoryNumbers),
					"man:Ports" : buildPorts(resourceNodeList[i].Ports),
				}
				);
			}
		}
		return resourceNodeListArray;
	}
	


function buildDirectoryNumbers(directoryNumbersList){
	var directoryNumbersArray = [];
	if (directoryNumbersList) {
		for (var i = 0; i < directoryNumbersList.length; i++) {
			directoryNumbersArray.push(
				{
					"man:BcCode": directoryNumbersList[i].BcCode,
					"man:DirNum": directoryNumbersList[i].DirNum,
					"man:DirNumOnBill": directoryNumbersList[i].DirNumOnBill,
					"man:DnID": directoryNumbersList[i].DnID,
					"man:DnType": directoryNumbersList[i].DnType,
					"man:ExtResourceTypeCode": directoryNumbersList[i].ExtResourceTypeCode,
					"man:IsVanity": directoryNumbersList[i].IsVanity,
					"man:LinkedPublicDnID": directoryNumbersList[i].LinkedPublicDnID,
					"man:LowerExt": directoryNumbersList[i].LowerExt,
					"man:MainDirNum": directoryNumbersList[i].MainDirNum,
					"man:Retention": directoryNumbersList[i].Retention,
					"man:UpperExt": directoryNumbersList[i].UpperExt,
					"man:HmCode": directoryNumbersList[i].HmCode,
					"man:NpCode": directoryNumbersList[i].NpCode,
					"man:HmCodePub": directoryNumbersList[i].HmCodePub,
					"man:NpCodePub": directoryNumbersList[i].NpCodePub,
					"man:Prefix": directoryNumbersList[i].Prefix,
					"man:MsisdnRelease" : {
						"man:BookingNumber": directoryNumbersList[i].MsisdnRelease.BookingNumber,
						"man:Fname": directoryNumbersList[i].MsisdnRelease.Fname,
						"man:Lname": directoryNumbersList[i].MsisdnRelease.Lname,
					}
				}
				);
		}
	}
	return directoryNumbersArray;
}

function buildPorts(portsList){
	var portsListArray = [];
	if (portsList) {
		for (var i = 0; i < portsList.length; i++) {
			portsListArray.push(
			{
				"man:ExtResourceTypeCode": portsList[i].ExtResourceTypeCode,
				"man:PortID": portsList[i].PortID,
				"man:PortNum": portsList[i].PortNum,
				"man:Retention": portsList[i].Retention,
				"man:Status": portsList[i].Status,
				"man:NpCode": portsList[i].NpCode,
				"man:NpCodePub":portsList[i].NpCodePub,
			}
			);
		}
	}
	return portsListArray;
}

function buildCugMemberships(cugMembershipsList){
	var cugMembershipsListArray = [];
	if (cugMembershipsList) {
		for (var i = 0; i < cugMembershipsList.length; i++) {
		cugMembershipsListArray.push(
		{
			"man:CugID": cugMembershipsList[i].CugID,
			"man:BasicServiceGroupAssigments": buildGroupAssignments(cugMembershipsList[i].BasicServiceGroupAssigments),
		}
		);
	}
}
return cugMembershipsListArray;
}

function buildGroupAssignments(groupAssignmentsList){
	var groupAssignmentsListArray = [];
	if(groupAssignmentsList){
		for (var i = 0; i < groupAssignmentsList.length; i++) {
			groupAssignmentsListArray.push(
				{
					"man:BsgID": groupAssignmentsList[i].BsgID,
					"man:BsgAction":groupAssignmentsList[i].BsgAction,
				}
				);
		}
	}
	return groupAssignmentsListArray;
}

function buildBsgConfiguration(bsgConfigurationList){
	var bsgConfigurationListArray = [];
	if (bsgConfigurationList) {
	for (var i = 0; i < bsgConfigurationList.length; i++) {
		bsgConfigurationListArray.push({
			"man:BsgID": bsgConfigurationList[i].BsgID,
			"man:PreferedCugID":bsgConfigurationList[i].PreferedCugID,
		});
	}
	}
	return bsgConfigurationListArray;
}


function buildGenericDirectoryNumber(genericDirectoryNumberList){
	var genericDirectoryNumberListArray = [];
	if (genericDirectoryNumberList) {
		for (var i = 0; i < genericDirectoryNumberList.length; i++) {
			genericDirectoryNumberListArray.push({
				"man:DealerID": genericDirectoryNumberList[i].DealerID,
				"man:DirNum": genericDirectoryNumberList[i].DirNum,
				"man:HLCode": genericDirectoryNumberList[i].HLCode,
				"man:HMCode": genericDirectoryNumberList[i].HMCode,
				"man:LowerExt": genericDirectoryNumberList[i].LowerExt,
				"man:Ndc": genericDirectoryNumberList[i].Ndc,
				"man:NpCode": genericDirectoryNumberList[i].NpCode,
				"man:ParametValues":{
					"man:PrmValueString": genericDirectoryNumberList[i].ParametValues.PrmValueString,
					"man:PrmNo": genericDirectoryNumberList[i].ParametValues.PrmNo,
					"man:ResourceLike":genericDirectoryNumberList[i].ParametValues.ResourceLike,
				},
				"man:PlCode": genericDirectoryNumberList[i].PlCode,
				"man:PortID": genericDirectoryNumberList[i].PortID,
				"man:Prefix": genericDirectoryNumberList[i].Prefix,
				"man:SubmID": genericDirectoryNumberList[i].SubmID,
				"man:UpperExt": genericDirectoryNumberList[i].UpperExt,
				"man:VpnID": genericDirectoryNumberList[i].VpnID,
				"man:DealerIdPub": genericDirectoryNumberList[i].DealerIdPub,
				"man:HlCodePub": genericDirectoryNumberList[i].HlCodePub,
				"man:HmCodePub": genericDirectoryNumberList[i].HmCodePub,
				"man:NpCodePub": genericDirectoryNumberList[i].NpCodePub,
				"man:PlCodePub": genericDirectoryNumberList[i].PlCodePub,
				"man:SubmIDPub": genericDirectoryNumberList[i].SubmIDPub,
				"man:VpnIdPub":genericDirectoryNumberList[i].VpnIdPub,
			});
		}
	}
	return genericDirectoryNumberListArray;
}

function buildBillingAccount(billingAccountList){
	var billingAccountListArray = [];
	if (billingAccountList){
		for (var i = 0; i < billingAccountList.length; i++) {
			billingAccountListArray.push({
				  "man:BillingAccountID": billingAccountList[i].BillingAccountID,
				  "man:BillingAccountCode": billingAccountList[i].BillingAccountCode,
				  "man:CoId": billingAccountList[i].CoId,
				  "man:CoIdPub": billingAccountList[i].CoIdPub,
				  "man:ChargeTypeID": billingAccountList[i].ChargeTypeID,
				  "man:Delete": billingAccountList[i].Delete,
				  "man:ProfileID": billingAccountList[i].ProfileID,
				  "man:SnCode": billingAccountList[i].SnCode,
				  "man:SnCodePub": billingAccountList[i].SnCodePub,
				  "man:ValidTo": billingAccountList[i].ValidTo,
			});
		}
	}
	return billingAccountListArray;
}

//Stringify JSON Object
context.setVariable("request.content" , JSON.stringify(soapRequest));