var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);
// input = addNamespace(input, "chan:");


var ActionCode=input.ActionCode;
var ServiceAccount=input.ServiceAccount;
var ProductType=input.ProductType;
var Name=input.Name;
var OrderItem=input.OrderItem;
var OrderType=input.OrderType;
var Value=input.Value;
var QuantityRequested=input.QuantityRequested;

context.setVariable("du.api.ActionCode",ActionCode);
context.setVariable("du.api.ProductType",ProductType);
context.setVariable("du.api.ServiceAccount",ServiceAccount);
context.setVariable("du.api.Name",Name);
context.setVariable("du.api.OrderItem",OrderItem);
context.setVariable("du.api.OrderType",OrderType);
context.setVariable("du.api.Value",Value);
context.setVariable("du.api.QuantityRequested",QuantityRequested);


var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"cre" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/CreateFixedModification"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:CreateFixedModification":{
				"Request":{
			
					"head:Header":{
						"head:RequestId": context.getVariable("du.api.requestId"),
						"head:Credentials":{
							"head:ApplicationId": context.getVariable("du.config.mceApplicationId"),
							"head:User": context.getVariable("du.config.mceUsername"),
							"head:Password": context.getVariable("du.config.mcePassword"),
						},
						"head:CorrelationId": "",
					},
					"lcew:Body": buildRequestBody(input)
				}
			}
		}
	}
};

context.setVariable("request.content", JSON.stringify(soapPayload));





function buildRequestBody(input){
  var bodyPayload =  {
        "cre:ListOfOrder" : getListOfOrder(input.ListOfOrder)

    
}

  bodyPayload =deleteNullUndefined(bodyPayload, "");
    return bodyPayload;
}







function getOrder(Order) {
    // body...
    if (Order) {
        return {
       
                "cre:SEOFWorkOrderType": Order.SEOFWorkOrderType,
                "cre:Id":Order.Id,
                "cre:Created":Order.Created,
                "cre:Updated":Order.Updated,
                "cre:ConflictId":Order.ConflictId,
                "cre:ModId":Order.ModId,
                "cre:Account":Order.Account,
                "cre:Comments":Order.Comments,
                "cre:ContactFaxNumber":Order.ContactFaxNumber,
                "cre:ContactFirstName":Order.ContactFirstName,
                "cre:ContactHomePhone":Order.ContactHomePhone,
                "cre:ContactLastName":Order.ContactLastName,
                "cre:ContactTitle":Order.ContactTitle,
                "cre:ContactWorkPhone":input.ListOfOrder.Order.ContactWorkPhone, 
                "cre:CurrencyCode":Order.CurrencyCode,
                "cre:EITCCompanyName":Order.EITCCompanyName,
                "cre:EITCContactMiddleName1":Order.EITCContactMiddleName1,
                "cre:EITCContactMiddleName2":Order.EITCContactMiddleName2,
                "cre:EITCContactMobileNumber":Order.EITCContactMobileNumber,
                "cre:EITCCustomerSegment":Order.EITCCustomerSegment,
                "cre:EITCDepartment":Order.EITCDepartment,
                "cre:EITCServiceAccountIntegrationId":Order.EITCServiceAccountIntegrationId,
                "cre:EmailAddress":Order.EmailAddress,
                "cre:IntegrationId":Order.IntegrationId,
                "cre:JobTitle":Order.JobTitle,
                "cre:OrderAccountType":Order.OrderAccountType,
                "cre:OrderDate":Order.OrderDate,
                "cre:OrderNumber":Order.OrderNumber,
                "cre:OrderPriority":input.ListOfOrder.Order.OrderPriority, 
                "cre:OrderType":Order.OrderType,
                "cre:RequestedShipDate":Order.RequestedShipDate,
                "cre:ServiceAccount":Order.ServiceAccount,
                "cre:ServiceAccountId":Order.ServiceAccountId,
                "cre:ServiceAccountNumber":Order.ServiceAccountNumber,
                "cre:EITCServiceAccountType":Order.EITCServiceAccountType,
                "cre:Status":Order.Status,
                "cre:RatePlanCode":Order.RatePlanCode,
                "cre:EITCServiceAccountOCCRateplan":Order.EITCServiceAccountOCCRateplan,
                "cre:EITCLargeAccountCode":input.ListOfOrder.Order.EITCLargeAccountCode, 
                "cre:EITCServiceAccountSegment":Order.EITCServiceAccountSegment,
                "cre:EITCEDMSUrl":Order.EITCEDMSUrl,
                "cre:SourceSystem":Order.SourceSystem,
                "cre:DeliveryBlock":Order.DeliveryBlock,
                "cre:HoldFlag":Order.HoldFlag,
                "cre:ReferenceId":Order.ReferenceId,
                "cre:ListOfAddresses": getListOfAddress(Order.ListOfAddresses),
               
                "cre:ListOfActivities":getActivity(Order.ListOfActivities),
                 
                "cre:ListOfOrderItems" :getOrderItem(Order.ListOfOrderItems)

        }
    }else{
        return null;
    }
    
}









function getListOfOrder(ListOfOrder) {
    // body...
    if (ListOfOrder) {
        return {
        "cre:Order" :getOrder(ListOfOrder.Order)
        }
    }else{
        return null;
    }
    
}







function getOrderItem(ListOfOrderItems) {
    // body...
    if (ListOfOrderItems) {
        return {
         "cre:OrderItem" :buildOrderItemArray(ListOfOrderItems.OrderItem),
        }
    }else{
        return null;
    }
    
}



function getListOfAddress(ListOfAddresses) {
    // body...
    if (ListOfAddresses) {
        return {
        "cre:Address": buildAddressArray(ListOfAddresses.Address),
        }
    }else{
        return null;
    }
    
}



function getActivity(ListOfActivities) {
    // body...
    if (ListOfActivities) {
        return {
         "cre:Activity":buildActivityArray(ListOfActivities.Activity),
        }
    }else{
        return null;
    }
    
}









function buildOrderItemArray(OrderItem){
  var idOrderItemArray = [];
  if(OrderItem){
    for (var i = 0; i < OrderItem.length; i++) {
      idOrderItemArray.push({
                     
                    "cre:Id": OrderItem[i].Id,
                    "cre:Created": OrderItem[i].Created,
                    "cre:Updated": OrderItem[i].Updated,
                    "cre:ConflictId": OrderItem[i].ConflictId,
                    "cre:ModId": OrderItem[i].ModId,
                    "cre:ProductId": OrderItem[i].ProductId,
                    "cre:QuantityRequested": OrderItem[i].QuantityRequested,
                    "cre:ActionCode": OrderItem[i].ActionCode,
                    "cre:AdjustedListPrice-Display": OrderItem[i].Display,
                    "cre:AssetIntegrationId": OrderItem[i].AssetIntegrationId,
                    "cre:AssetStatus": OrderItem[i].AssetStatus,
                    "cre:LocationAServiceInstallationDate": OrderItem[i].LocationAServiceInstallationDate,
                    "cre:LocationBServiceInstallationDate": OrderItem[i].LocationBServiceInstallationDate,
                    "cre:ServiceActivationDate": OrderItem[i].ServiceActivationDate,
                    "cre:BillingAccount": OrderItem[i].BillingAccount,
                    "cre:ServiceProvisioningDate": OrderItem[i].ServiceProvisioningDate,
                    "cre:WorkOrderClosureDate": OrderItem[i].WorkOrderClosureDate,
                    "cre:WorkOrderCreatedDate": OrderItem[i].WorkOrderCreatedDate,
                    "cre:ContactFirstName": OrderItem[i].ContactFirstName,
                    "cre:ContactLastName": OrderItem[i].ContactLastName,
                    "cre:CoveredQuoteItemId": OrderItem[i].CoveredQuoteItemId,
                    "cre:CurrencyCode": OrderItem[i].CurrencyCode,
                    "cre:Description3": OrderItem[i].Description3,
                    "cre:DiscountPercent": OrderItem[i].DiscountPercent,
                    "cre:DueDate": OrderItem[i].DueDate,
                    "cre:EAISyncDate": OrderItem[i].EAISyncDate,
                    "cre:EITCAccountOwnerofNewLineFlag": OrderItem[i].EITCAccountOwnerofNewLineFlag,
                    "cre:EITCAddressApartNo": OrderItem[i].EITCAddressApartNo,
                    "cre:EITCAddressBuildingName": OrderItem[i].EITCAddressBuildingName,
                    "cre:EITCAddressCity": OrderItem[i].EITCAddressCity,
                    "cre:EITCAddressCountry": OrderItem[i].EITCAddressCountry,
                    "cre:EITCAddressCounty": OrderItem[i].EITCAddressCounty,
                    "cre:EITCAddressFloor": OrderItem[i].EITCAddressFloor,
                    "cre:EITCAddressLandmark": OrderItem[i].EITCAddressLandmark,
                    "cre:EITCAddressPlot": OrderItem[i].EITCAddressPlot,
                    "cre:EITCAddressPoBox": OrderItem[i].EITCAddressPoBox,
                    "cre:EITCAddressState": OrderItem[i].EITCAddressState,
                    "cre:EITCAddressStreet": OrderItem[i].EITCAddressStreet,
                    "cre:EITCOCCEntity": OrderItem[i].EITCOCCEntity,
                    "cre:EITCAddressStreet2": OrderItem[i].EITCAddressStreet2,
                    "cre:EITCAddressType": OrderItem[i].EITCAddressType,
                    "cre:EITCAuthorizedPersonFlag": OrderItem[i].EITCAuthorizedPersonFlag,
                    "cre:EITCBuildingNo": OrderItem[i].EITCBuildingNo,
                    "cre:EITCCampaignId": OrderItem[i].EITCCampaignId,
                    "cre:EITCCampaignName": OrderItem[i].EITCCampaignName,
                    "cre:EITCDealerID2": OrderItem[i].EITCDealerID2,
                    "cre:EITCGAID": OrderItem[i].EITCGAID,
                    "cre:EITCOldAddressCity": OrderItem[i].EITCOldAddressCity,
                    "cre:EITCOldAddressCountry": OrderItem[i].EITCOldAddressCountry,
                    "cre:EITCOldAddressCounty": OrderItem[i].EITCOldAddressCounty,
                    "cre:EITCOldAddressFloor": OrderItem[i].EITCOldAddressFloor,
                    "cre:EITCOldAddressState": OrderItem[i].EITCOldAddressState,
                    "cre:EITCOldApartNo": OrderItem[i].EITCOldApartNo,
                    "cre:EITCOldBuildingName": OrderItem[i].EITCOldBuildingName,
                    "cre:EITCOldGAID": OrderItem[i].EITCOldGAID,
                    "cre:EITCOldLandmark": OrderItem[i].EITCOldLandmark,
                    "cre:EITCOldPOBox": OrderItem[i].EITCOldPOBox,
                    "cre:EITCOldPlot": OrderItem[i].EITCOldPlot,
                    "cre:EITCPassword": OrderItem[i].EITCPassword,
                    "cre:EITCPrimaryServiceId": OrderItem[i].EITCPrimaryServiceId,
                    "cre:EITCServiceAccountIntegrationId": OrderItem[i].EITCServiceAccountIntegrationId,
                    "cre:EITCServiceStatusChangeReason": OrderItem[i].EITCServiceStatusChangeReason,
                    "cre:EITCVIPFlag": OrderItem[i].EITCVIPFlag,
                    "cre:ExcludePricingFlag": OrderItem[i].ExcludePricingFlag,
                    "cre:EITCRelationshipName": OrderItem[i].EITCRelationshipName,
                    "cre:IntegrationId": OrderItem[i].IntegrationId,
                    "cre:LineNumber": OrderItem[i].LineNumber,
                    "cre:MRCCxTotal": OrderItem[i].MRCCxTotal,
                    "cre:NRCCxTotal": OrderItem[i].NRCCxTotal,
                    "cre:NetPrice": OrderItem[i].NetPrice,
                    "cre:ParentOrderItemId": OrderItem[i].ParentOrderItemId,
                    "cre:PreviousBillingAccount": OrderItem[i].PreviousBillingAccount,
                    "cre:PriceType": OrderItem[i].PriceType,
                    "cre:ProdPromId": OrderItem[i].ProdPromId,
                    "cre:ProdPromName": OrderItem[i].ProdPromName,
                    "cre:ProdPromRuleId": OrderItem[i].ProdPromRuleId,
                    "cre:ProdPromInstanceId": OrderItem[i].ProdPromInstanceId,
                    "cre:Product": OrderItem[i].Product,
                    "cre:ProductIntegrationId": OrderItem[i].ProductIntegrationId,
                    "cre:ProductType": OrderItem[i].ProductType,
                    "cre:Quantity": OrderItem[i].Quantity,
                    "cre:RootOrderItemId": OrderItem[i].RootOrderItemId,
                    "cre:SalesServiceFlag": OrderItem[i].SalesServiceFlag,
                    "cre:ServiceAccount": OrderItem[i].ServiceAccount,
                    "cre:ServiceAccountId": OrderItem[i].ServiceAccountId,
                    "cre:ServiceAddressId": OrderItem[i].ServiceAddressId,
                    "cre:ServiceId": OrderItem[i].ServiceId,
                    "cre:RequestId": OrderItem[i].RequestId,
                    "cre:OriginatorId": OrderItem[i].OriginatorId,
                    "cre:PreviousRequestId": OrderItem[i].PreviousRequestId,
                    "cre:PreviousOriginatorId": OrderItem[i].PreviousOriginatorId,
                    "cre:ServiceStartDate": OrderItem[i].ServiceStartDate,
                    "cre:ServiceType": OrderItem[i].ServiceType,
                    "cre:Status": OrderItem[i].Status,
                    "cre:EITCDeposit": OrderItem[i].EITCDeposit,
                    "cre:EITCAutoAssetReady": OrderItem[i].EITCAutoAssetReady,
                    "cre:ContactBirth": OrderItem[i].ContactBirth,
                    "cre:ContactEmail": OrderItem[i].ContactEmail,
                    "cre:ContactGender": OrderItem[i].ContactGender,
                    "cre:ContactMiddleName1": OrderItem[i].ContactMiddleName1,
                    "cre:ContactMiddleName2": OrderItem[i].ContactMiddleName2,
                    "cre:ContactNationality": OrderItem[i].ContactNationality,
                    "cre:ContactTitle2": OrderItem[i].ContactTitle2,
                    "cre:ServiceInstanceFlag": OrderItem[i].ServiceInstanceFlag,
                    "cre:EITCResourceType": OrderItem[i].EITCResourceType,
                    "cre:EITCAllowFUCarryOver": OrderItem[i].EITCAllowFUCarryOver,
                    "cre:EITCListinPubDir": OrderItem[i].EITCListinPubDir,
                    "cre:EITCLogicalHLR": OrderItem[i].EITCLogicalHLR,
                    "cre:EITCMarket": OrderItem[i].EITCMarket,
                    "cre:EITCNetwork": OrderItem[i].EITCNetwork,
                    "cre:EITCNumberingPlan": OrderItem[i].EITCNumberingPlan,
                    "cre:EITCPhysicalHLR": OrderItem[i].EITCPhysicalHLR,
                    "cre:EITCPostpaidFlag": OrderItem[i].EITCPostpaidFlag,
                    "cre:EITCArchiveCalls": OrderItem[i].EITCArchiveCalls,
                    "cre:EITCCustomerServiceLang": OrderItem[i].EITCCustomerServiceLang,
                    "cre:EITCSignedOn": OrderItem[i].EITCSignedOn,
                    "cre:EITCSubmarket": OrderItem[i].EITCSubmarket,
                    "cre:EITCTargetSystem": OrderItem[i].EITCTargetSystem,
                    "cre:EITCWithholdDirectoryList": OrderItem[i].EITCWithholdDirectoryList,
                    "cre:EITCSalesPerson": OrderItem[i].EITCSalesPerson,
                    "cre:EITCServiceIdCalc": OrderItem[i].EITCServiceIdCalc,
                    "cre:EITCListinOperDir": OrderItem[i].EITCListinOperDir,
                    "cre:EITCContactAddrArea": OrderItem[i].EITCContactAddrArea,
                    "cre:EITCContactAddrCity": OrderItem[i].EITCContactAddrCity,
                    "cre:EITCContactAddrEmirate": OrderItem[i].EITCContactAddrEmirate,
                    "cre:EITCContactAddrPOBox": OrderItem[i].EITCContactAddrPOBox,
                    "cre:EITCContactAddrIntegId": OrderItem[i].EITCContactAddrIntegId,
                    "cre:EITCContractContactIntegId": OrderItem[i].EITCContractContactIntegId,
                    "cre:EITCContactAddrId": OrderItem[i].EITCContactAddrId,
                    "cre:EITCSubZone": OrderItem[i].EITCSubZone,
                    "cre:EITCOldSubZone": OrderItem[i].EITCOldSubZone,
                    "cre:EITCModeOfReuse": OrderItem[i].EITCModeOfReuse,
                    "cre:CoveredProduct": OrderItem[i].CoveredProduct,
                    "cre:EITCOldProdPromName": OrderItem[i].EITCOldProdPromName,
                    "cre:EITCPromValidDate": OrderItem[i].EITCPromValidDate,
                    "cre:EITCOldPromIntegrationId": OrderItem[i].EITCOldPromIntegrationId,
                    "cre:EITCOldPromotionId": OrderItem[i].EITCOldPromotionId,
                    "cre:EITCPromIntegrationId": OrderItem[i].EITCPromIntegrationId,
                    "cre:RatePlanCode": OrderItem[i].RatePlanCode,
                    "cre:MinimumLot": OrderItem[i].MinimumLot,
                    "cre:Note": OrderItem[i].Note,
                    "cre:EITCOldAddressStreet": OrderItem[i].EITCOldAddressStreet,
                    "cre:EITCOldAddressStreet2": OrderItem[i].EITCOldAddressStreet2,
                    "cre:EITCOldAddressType": OrderItem[i].EITCOldAddressType,
                    "cre:EITCOldBuildingNo": OrderItem[i].EITCOldBuildingNo,
                    "cre:EITCBSCSDepositReferenceId": OrderItem[i].EITCBSCSDepositReferenceId,
                    "cre:EITCCustomerDeliveryDate": OrderItem[i].EITCCustomerDeliveryDate,
                    "cre:EITCOldQuantity": OrderItem[i].EITCOldQuantity,
                    "cre:EITCTechContactLastName": OrderItem[i].EITCTechContactLastName,
                    "cre:EITCTechContactFirstName": OrderItem[i].EITCTechContactFirstName,
                    "cre:EITCTechContactPhone": OrderItem[i].EITCTechContactPhone,
                    "cre:EITCToTechContactFName": OrderItem[i].EITCToTechContactFName,
                    "cre:EITCToTechContactLName": OrderItem[i].EITCToTechContactLName,
                    "cre:EITCToTechContactPhone": OrderItem[i].EITCToTechContactPhone,
                    "cre:EITCToAddressApartNo": OrderItem[i].EITCToAddressApartNo,
                    "cre:EITCToAddressBuildingName": OrderItem[i].EITCToAddressBuildingName,
                    "cre:EITCToAddressCity": OrderItem[i].EITCToAddressCity,
                    "cre:EITCToAddressCountry": OrderItem[i].EITCToAddressCountry,
                    "cre:EITCToAddressCounty": OrderItem[i].EITCToAddressCounty,
                    "cre:EITCToAddressFloor": OrderItem[i].EITCToAddressFloor,
                    "cre:EITCToAddressLandmark": OrderItem[i].EITCToAddressLandmark,
                    "cre:EITCToAddressPlot": OrderItem[i].EITCToAddressPlot,
                    "cre:EITCToAddressPoBox": OrderItem[i].EITCToAddressPoBox,
                    "cre:EITCToAddressStreet": OrderItem[i].EITCToAddressStreet,
                    "cre:EITCToAddressStreet2": OrderItem[i].EITCToAddressStreet2,
                    "cre:EITCToAddressType": OrderItem[i].EITCToAddressType,
                    "cre:EITCToBuildingNo": OrderItem[i].EITCToBuildingNo,
                    "cre:EITCToGAID": OrderItem[i].EITCToGAID,
                    "cre:EITCOldAddressZone": OrderItem[i].EITCOldAddressZone,
                    "cre:EITCAddressZone": OrderItem[i].EITCAddressZone,
                    "cre:EITCToSubZone": OrderItem[i].EITCToSubZone,
                    "cre:EITCSectorNumber": OrderItem[i].EITCSectorNumber,
                    "cre:EITCOldSectorNumber": OrderItem[i].EITCOldSectorNumber,
                    "cre:EITCToAddressState": OrderItem[i].EITCToAddressState,
                    "cre:EITCOldToAddressCity": OrderItem[i].EITCOldToAddressCity,
                    "cre:EITCToOldSubZone": OrderItem[i].EITCToOldSubZone,
                    "cre:EITCToOldGAID": OrderItem[i].EITCToOldGAID,
                    "cre:EITCOldToPlot": OrderItem[i].EITCOldToPlot,
                    "cre:EITCOldToPOBox": OrderItem[i].EITCOldToPOBox,
                    "cre:EITCOldToLandmark": OrderItem[i].EITCOldToLandmark,
                    "cre:EITCOldToBuildingName": OrderItem[i].EITCOldToBuildingName,
                    "cre:EITCOldToApartNo": OrderItem[i].EITCOldToApartNo,
                    "cre:EITCOldToAddressState": OrderItem[i].EITCOldToAddressState,
                    "cre:EITCOldToAddressFloor": OrderItem[i].EITCOldToAddressFloor,
                    "cre:EITCOldToAddressCounty": OrderItem[i].EITCOldToAddressCounty,
                    "cre:EITCOldToAddressCountry": OrderItem[i].EITCOldToAddressCountry,
                    "cre:UnitofMeasure": OrderItem[i].UnitofMeasure,
                    "cre:EITCProdPromType": OrderItem[i].EITCProdPromType,
                    "cre:EITCPrimaryProductLine": OrderItem[i].EITCPrimaryProductLine,
                    "cre:EITCBillCycles": OrderItem[i].EITCBillCycles,
                    "cre:EITCMultipleResources": OrderItem[i].EITCMultipleResources,
                    "cre:FieldReplacableUnit": OrderItem[i].FieldReplacableUnit,
                    "cre:ListofBitStreamInformation": getBitStreamInformation(OrderItem[i].ListofBitStreamInformation),
                    "cre:ListOfOrderItemXa": getOrderItemXa(OrderItem[i].ListOfOrderItemXa) 



                      
            });
    }
  }
  return idOrderItemArray;
}



function getOrderItemXa(ListOfOrderItemXa) {
    // body...
    if (ListOfOrderItemXa) {
        return {
           "cre:OrderItemXa": buildOrderItemXaArray(ListOfOrderItemXa.OrderItemXa),
        }
    }else{
        return null;
    }
    
}






function getBitStreamInformation(ListofBitStreamInformation) {
    // body...
    if (ListofBitStreamInformation) {
        return {
          "cre:BitStreamInformation":buildBitStreamInformationArray(OrderItem[i].BitStreamInformation),
        }
    }else{
        return null;
    }
    
}







function buildOrderItemXaArray(OrderItemXa){
  var idOrderItemXaArray = [];
  if(OrderItemXa){
    for (var i = 0; i < OrderItemXa.length; i++) {
      idOrderItemXaArray.push({
                        
                        "cre:Id": OrderItemXa[i].Id,
                        "cre:Created": OrderItemXa[i].Created,
                        "cre:Updated": OrderItemXa[i].Updated,
                        "cre:ConflictId": OrderItemXa[i].ConflictId,
                        "cre:ModId": OrderItemXa[i].ModId,
                        "cre:EITCTargetSystemXA": OrderItemXa[i].EITCTargetSystemXA,
                        "cre:ActionCode": OrderItemXa[i].ActionCode,
                        "cre:IntegrationId": OrderItemXa[i].IntegrationId,
                        "cre:Name": OrderItemXa[i].Name,
                        "cre:ProductId": OrderItemXa[i].ProductId,
                        "cre:Value": OrderItemXa[i].Value,
                        "cre:PreviousValue": OrderItemXa[i].PreviousValue     

            });
    }
  }
   return idOrderItemXaArray;
}



function buildBitStreamInformationArray(BitStreamInformation){
  var idBitStreamInformationArray = [];
  if(BitStreamInformation){
    for (var i = 0; i < BitStreamInformation.length; i++) {
      idBitStreamInformationArray.push({
                        
               "cre:Name":BitStreamInformation[i].Name,
               "cre:Value":BitStreamInformation[i].Value
                   

            })
    }
  }
      return idBitStreamInformationArray;
}





function buildActivityArray(Activity){
  var idActivityArray = [];
  if(Activity){
    for (var i = 0; i < Activity.length; i++) {
      idActivityArray.push({
                        

                        "cre:Id": Activity[i].Id,
                        "cre:Created": Activity[i].Created,
                        "cre:Updated": Activity[i].Updated,
                        "cre:ConflictId": Activity[i].ConflictId,
                        "cre:ModId": Activity[i].ModId,
                        "cre:ActivityUID": Activity[i].ActivityUID,
                        "cre:Status": Activity[i].Status,
                        "cre:Comment": Activity[i].Comment,
                        "cre:Description2": Activity[i].Description2,
                        "cre:DurationMinutes": Activity[i].DurationMinutes,
                        "cre:Planned": Activity[i].Planned,
                        "cre:PrimaryOwnedBy": Activity[i].PrimaryOwnedBy,
                        "cre:Type": Activity[i].Type,
                        "cre:EITCServiceRegion": Activity[i].EITCServiceRegion,
                        "cre:IntegrationReturnCode": Activity[i].IntegrationReturnCode,
                        "cre:EITCRescheduleReason": Activity[i].EITCRescheduleReason,
                        "cre:EITCActivityFailedSequence": Activity[i].EITCActivityFailedSequence

            });
    }
  }
    return idActivityArray;
}

function buildAddressArray(Address){
  var idAddressArray = [];
  if(Address){
    for (var i = 0; i < Address.length; i++) {
      idAddressArray.push({
            "@IsPrimaryMVG":Address[i].IsPrimaryMVG,
            "@operation":Address[i].operation,
            "@searchspec":Address[i].searchspec,
            "cre:AccountAddress":Address[i].AccountAddress,
            "cre:AccountAddressCountry":Address[i].AccountAddressCountry,
            "cre:AccountAddressPostalCode":Address[i].AccountAddressPostalCode,
            "cre:AccountAddressState":Address[i].AccountAddressState,
            "cre:AccountAddressStreet2":Address[i].AccountAddressStreet2,
            "cre:AccountAddressCity":Address[i].AccountAddressCity,
            "cre:EITCAccountAddressStreet":Address[i].EITCAccountAddressStreet,
            "cre:EITCAddressBuildingName":Address[i].EITCAddressBuildingName,
            "cre:EITCAddressCounty":Address[i].EITCAddressCounty,
            "cre:EITCAddressFloor":Address[i].EITCAddressFloor,
            "cre:EITCAddressNearestLandmark":Address[i].EITCAddressNearestLandmark,
            "cre:EITCApartmentNumber":Address[i].EITCApartmentNumber,
            "cre:EITCBuildingNo":Address[i].EITCBuildingNo,
            "cre:EITCAddressZone":Address[i].EITCAddressZone
      });
    }
  }
    return idAddressArray;
}
