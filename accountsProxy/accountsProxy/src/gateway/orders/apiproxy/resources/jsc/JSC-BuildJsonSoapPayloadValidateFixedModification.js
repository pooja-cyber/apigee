var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);
// input = addNamespace(input, "chan:");


if(input.ListOfOrder.Order)

var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"val" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/ValidateFixedModification"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ValidateFixedModification":{
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
					"lcew:Body":  buildRequestBody(input)
				}
			}
		}
	}
};

context.setVariable("request.content", JSON.stringify(soapPayload));





function buildRequestBody(input){
	   var bodyPayload =    {
		"val:ListOfOrder" : getListOfOrder(input.ListOfOrder)

    
}
  bodyPayload =deleteNullUndefined(bodyPayload, "");
    return bodyPayload;
}





function getOrder(Order) {
    // body...
    if (Order) {
        return {
       
                "val:SEOFWorkOrderType": Order.SEOFWorkOrderType,
                "val:Id":Order.Id,
                "val:Created":Order.Created,
                "val:Updated":Order.Updated,
                "val:ConflictId":Order.ConflictId,
                "val:ModId":Order.ModId,
                "val:Account":Order.Account,
                "val:Comments":Order.Comments,
                "val:ContactFaxNumber":Order.ContactFaxNumber,
                "val:ContactFirstName":Order.ContactFirstName,
                "val:ContactHomePhone":Order.ContactHomePhone,
                "val:ContactLastName":Order.ContactLastName,
                "val:ContactTitle":Order.ContactTitle,
                "val:ContactWorkPhone":input.ListOfOrder.Order.ContactWorkPhone, 
                "val:CurrencyCode":Order.CurrencyCode,
                "val:EITCCompanyName":Order.EITCCompanyName,
                "val:EITCContactMiddleName1":Order.EITCContactMiddleName1,
                "val:EITCContactMiddleName2":Order.EITCContactMiddleName2,
                "val:EITCContactMobileNumber":Order.EITCContactMobileNumber,
                "val:EITCCustomerSegment":Order.EITCCustomerSegment,
                "val:EITCDepartment":Order.EITCDepartment,
                "val:EITCServiceAccountIntegrationId":Order.EITCServiceAccountIntegrationId,
                "val:EmailAddress":Order.EmailAddress,
                "val:IntegrationId":Order.IntegrationId,
                "val:JobTitle":Order.JobTitle,
                "val:OrderAccountType":Order.OrderAccountType,
                "val:OrderDate":Order.OrderDate,
                "val:OrderNumber":Order.OrderNumber,
                "val:OrderPriority":input.ListOfOrder.Order.OrderPriority, 
                "val:OrderType":Order.OrderType,
                "val:RequestedShipDate":Order.RequestedShipDate,
                "val:ServiceAccount":Order.ServiceAccount,
                "val:ServiceAccountId":Order.ServiceAccountId,
                "val:ServiceAccountNumber":Order.ServiceAccountNumber,
                "val:EITCServiceAccountType":Order.EITCServiceAccountType,
                "val:Status":Order.Status,
                "val:RatePlanCode":Order.RatePlanCode,
                "val:EITCServiceAccountOCCRateplan":Order.EITCServiceAccountOCCRateplan,
                "val:EITCLargeAccountCode":input.ListOfOrder.Order.EITCLargeAccountCode, 
                "val:EITCServiceAccountSegment":Order.EITCServiceAccountSegment,
                "val:EITCEDMSUrl":Order.EITCEDMSUrl,
                "val:SourceSystem":Order.SourceSystem,
                "val:DeliveryBlock":Order.DeliveryBlock,
                "val:HoldFlag":Order.HoldFlag,
                "val:ReferenceId":Order.ReferenceId,
                "val:ListOfAddresses": getListOfAddress(Order.ListOfAddresses),
               
                "val:ListOfActivities":getActivity(Order.ListOfActivities),
                 
                "val:ListOfOrderItems" :getOrderItem(Order.ListOfOrderItems)

        }
    }else{
        return null;
    }
    
}



function getListOfOrder(ListOfOrder) {
    // body...
    if (ListOfOrder) {
        return {
        "val:Order" :getOrder(ListOfOrder.Order)
        }
    }else{
        return null;
    }
    
}




function getOrderItem(ListOfOrderItems) {
    // body...
    if (ListOfOrderItems) {
        return {
         "val:OrderItem" :buildOrderItemArray(ListOfOrderItems.OrderItem),
        }
    }else{
        return null;
    }
    
}



function getListOfAddress(ListOfAddresses) {
    // body...
    if (ListOfAddresses) {
        return {
        "val:Address": buildAddressArray(ListOfAddresses.Address),
        }
    }else{
        return null;
    }
    
}



function getActivity(ListOfActivities) {
    // body...
    if (ListOfActivities) {
        return {
         "val:Activity":buildActivityArray(ListOfActivities.Activity),
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
                    "@operation":OrderItem[i].operation,
                    "@searchspec":OrderItem[i].searchspec,
                    "val:Id": OrderItem[i].Id,
                    "val:Created": OrderItem[i].Created,
                    "val:Updated": OrderItem[i].Updated,
                    "val:ConflictId": OrderItem[i].ConflictId,
                    "val:ModId": OrderItem[i].ModId,
                    "val:ProductId": OrderItem[i].ProductId,
                    "val:QuantityRequested": OrderItem[i].QuantityRequested,
                    "val:ActionCode": OrderItem[i].ActionCode,
                    "val:AdjustedListPrice-Display": OrderItem[i].Display,
                    "val:AssetIntegrationId": OrderItem[i].AssetIntegrationId,
                    "val:AssetStatus": OrderItem[i].AssetStatus,
                    "val:LocationAServiceInstallationDate": OrderItem[i].LocationAServiceInstallationDate,
                    "val:LocationBServiceInstallationDate": OrderItem[i].LocationBServiceInstallationDate,
                    "val:ServiceActivationDate": OrderItem[i].ServiceActivationDate,
                    "val:BillingAccount": OrderItem[i].BillingAccount,
                    "val:ServiceProvisioningDate": OrderItem[i].ServiceProvisioningDate,
                    "val:WorkOrderClosureDate": OrderItem[i].WorkOrderClosureDate,
                    "val:WorkOrderCreatedDate": OrderItem[i].WorkOrderCreatedDate,
                    "val:ContactFirstName": OrderItem[i].ContactFirstName,
                    "val:ContactLastName": OrderItem[i].ContactLastName,
                    "val:CoveredQuoteItemId": OrderItem[i].CoveredQuoteItemId,
                    "val:CurrencyCode": OrderItem[i].CurrencyCode,
                    "val:Description3": OrderItem[i].Description3,
                    "val:DiscountPercent": OrderItem[i].DiscountPercent,
                    "val:DueDate": OrderItem[i].DueDate,
                    "val:EAISyncDate": OrderItem[i].EAISyncDate,
                    "val:EITCAccountOwnerofNewLineFlag": OrderItem[i].EITCAccountOwnerofNewLineFlag,
                    "val:EITCAddressApartNo": OrderItem[i].EITCAddressApartNo,
                    "val:EITCAddressBuildingName": OrderItem[i].EITCAddressBuildingName,
                    "val:EITCAddressCity": OrderItem[i].EITCAddressCity,
                    "val:EITCAddressCountry": OrderItem[i].EITCAddressCountry,
                    "val:EITCAddressCounty": OrderItem[i].EITCAddressCounty,
                    "val:EITCAddressFloor": OrderItem[i].EITCAddressFloor,
                    "val:EITCAddressLandmark": OrderItem[i].EITCAddressLandmark,
                    "val:EITCAddressPlot": OrderItem[i].EITCAddressPlot,
                    "val:EITCAddressPoBox": OrderItem[i].EITCAddressPoBox,
                    "val:EITCAddressState": OrderItem[i].EITCAddressState,
                    "val:EITCAddressStreet": OrderItem[i].EITCAddressStreet,
                    "val:EITCOCCEntity": OrderItem[i].EITCOCCEntity,
                    "val:EITCAddressStreet2": OrderItem[i].EITCAddressStreet2,
                    "val:EITCAddressType": OrderItem[i].EITCAddressType,
                    "val:EITCAuthorizedPersonFlag": OrderItem[i].EITCAuthorizedPersonFlag,
                    "val:EITCBuildingNo": OrderItem[i].EITCBuildingNo,
                    "val:EITCCampaignId": OrderItem[i].EITCCampaignId,
                    "val:EITCCampaignName": OrderItem[i].EITCCampaignName,
                    "val:EITCDealerID2": OrderItem[i].EITCDealerID2,
                    "val:EITCGAID": OrderItem[i].EITCGAID,
                    "val:EITCOldAddressCity": OrderItem[i].EITCOldAddressCity,
                    "val:EITCOldAddressCountry": OrderItem[i].EITCOldAddressCountry,
                    "val:EITCOldAddressCounty": OrderItem[i].EITCOldAddressCounty,
                    "val:EITCOldAddressFloor": OrderItem[i].EITCOldAddressFloor,
                    "val:EITCOldAddressState": OrderItem[i].EITCOldAddressState,
                    "val:EITCOldApartNo": OrderItem[i].EITCOldApartNo,
                    "val:EITCOldBuildingName": OrderItem[i].EITCOldBuildingName,
                    "val:EITCOldGAID": OrderItem[i].EITCOldGAID,
                    "val:EITCOldLandmark": OrderItem[i].EITCOldLandmark,
                    "val:EITCOldPOBox": OrderItem[i].EITCOldPOBox,
                    "val:EITCOldPlot": OrderItem[i].EITCOldPlot,
                    "val:EITCPassword": OrderItem[i].EITCPassword,
                    "val:EITCPrimaryServiceId": OrderItem[i].EITCPrimaryServiceId,
                    "val:EITCServiceAccountIntegrationId": OrderItem[i].EITCServiceAccountIntegrationId,
                    "val:EITCServiceStatusChangeReason": OrderItem[i].EITCServiceStatusChangeReason,
                    "val:EITCVIPFlag": OrderItem[i].EITCVIPFlag,
                    "val:ExcludePricingFlag": OrderItem[i].ExcludePricingFlag,
                    "val:EITCRelationshipName": OrderItem[i].EITCRelationshipName,
                    "val:IntegrationId": OrderItem[i].IntegrationId,
                    "val:LineNumber": OrderItem[i].LineNumber,
                    "val:MRCCxTotal": OrderItem[i].MRCCxTotal,
                    "val:NRCCxTotal": OrderItem[i].NRCCxTotal,
                    "val:NetPrice": OrderItem[i].NetPrice,
                    "val:ParentOrderItemId": OrderItem[i].ParentOrderItemId,
                    "val:PreviousBillingAccount": OrderItem[i].PreviousBillingAccount,
                    "val:PriceType": OrderItem[i].PriceType,
                    "val:ProdPromId": OrderItem[i].ProdPromId,
                    "val:ProdPromName": OrderItem[i].ProdPromName,
                    "val:ProdPromRuleId": OrderItem[i].ProdPromRuleId,
                    "val:ProdPromInstanceId": OrderItem[i].ProdPromInstanceId,
                    "val:Product": OrderItem[i].Product,
                    "val:ProductIntegrationId": OrderItem[i].ProductIntegrationId,
                    "val:ProductType": OrderItem[i].ProductType,
                    "val:Quantity": OrderItem[i].Quantity,
                    "val:RootOrderItemId": OrderItem[i].RootOrderItemId,
                    "val:SalesServiceFlag": OrderItem[i].SalesServiceFlag,
                    "val:ServiceAccount": OrderItem[i].ServiceAccount,
                    "val:ServiceAccountId": OrderItem[i].ServiceAccountId,
                    "val:ServiceAddressId": OrderItem[i].ServiceAddressId,
                    "val:ServiceId": OrderItem[i].ServiceId,
                    "val:RequestId": OrderItem[i].RequestId,
                    "val:OriginatorId": OrderItem[i].OriginatorId,
                    "val:PreviousRequestId": OrderItem[i].PreviousRequestId,
                    "val:PreviousOriginatorId": OrderItem[i].PreviousOriginatorId,
                    "val:ServiceStartDate": OrderItem[i].ServiceStartDate,
                    "val:ServiceType": OrderItem[i].ServiceType,
                    "val:Status": OrderItem[i].Status,
                    "val:EITCDeposit": OrderItem[i].EITCDeposit,
                    "val:EITCAutoAssetReady": OrderItem[i].EITCAutoAssetReady,
                    "val:ContactBirth": OrderItem[i].ContactBirth,
                    "val:ContactEmail": OrderItem[i].ContactEmail,
                    "val:ContactGender": OrderItem[i].ContactGender,
                    "val:ContactMiddleName1": OrderItem[i].ContactMiddleName1,
                    "val:ContactMiddleName2": OrderItem[i].ContactMiddleName2,
                    "val:ContactNationality": OrderItem[i].ContactNationality,
                    "val:ContactTitle2": OrderItem[i].ContactTitle2,
                    "val:ServiceInstanceFlag": OrderItem[i].ServiceInstanceFlag,
                    "val:EITCResourceType": OrderItem[i].EITCResourceType,
                    "val:EITCAllowFUCarryOver": OrderItem[i].EITCAllowFUCarryOver,
                    "val:EITCListinPubDir": OrderItem[i].EITCListinPubDir,
                    "val:EITCLogicalHLR": OrderItem[i].EITCLogicalHLR,
                    "val:EITCMarket": OrderItem[i].EITCMarket,
                    "val:EITCNetwork": OrderItem[i].EITCNetwork,
                    "val:EITCNumberingPlan": OrderItem[i].EITCNumberingPlan,
                    "val:EITCPhysicalHLR": OrderItem[i].EITCPhysicalHLR,
                    "val:EITCPostpaidFlag": OrderItem[i].EITCPostpaidFlag,
                    "val:EITCArchiveCalls": OrderItem[i].EITCArchiveCalls,
                    "val:EITCCustomerServiceLang": OrderItem[i].EITCCustomerServiceLang,
                    "val:EITCSignedOn": OrderItem[i].EITCSignedOn,
                    "val:EITCSubmarket": OrderItem[i].EITCSubmarket,
                    "val:EITCTargetSystem": OrderItem[i].EITCTargetSystem,
                    "val:EITCWithholdDirectoryList": OrderItem[i].EITCWithholdDirectoryList,
                    "val:EITCSalesPerson": OrderItem[i].EITCSalesPerson,
                    "val:EITCServiceIdCalc": OrderItem[i].EITCServiceIdCalc,
                    "val:EITCListinOperDir": OrderItem[i].EITCListinOperDir,
                    "val:EITCContactAddrArea": OrderItem[i].EITCContactAddrArea,
                    "val:EITCContactAddrCity": OrderItem[i].EITCContactAddrCity,
                    "val:EITCContactAddrEmirate": OrderItem[i].EITCContactAddrEmirate,
                    "val:EITCContactAddrPOBox": OrderItem[i].EITCContactAddrPOBox,
                    "val:EITCContactAddrIntegId": OrderItem[i].EITCContactAddrIntegId,
                    "val:EITCContractContactIntegId": OrderItem[i].EITCContractContactIntegId,
                    "val:EITCContactAddrId": OrderItem[i].EITCContactAddrId,
                    "val:EITCSubZone": OrderItem[i].EITCSubZone,
                    "val:EITCOldSubZone": OrderItem[i].EITCOldSubZone,
                    "val:EITCModeOfReuse": OrderItem[i].EITCModeOfReuse,
                    "val:CoveredProduct": OrderItem[i].CoveredProduct,
                    "val:EITCOldProdPromName": OrderItem[i].EITCOldProdPromName,
                    "val:EITCPromValidDate": OrderItem[i].EITCPromValidDate,
                    "val:EITCOldPromIntegrationId": OrderItem[i].EITCOldPromIntegrationId,
                    "val:EITCOldPromotionId": OrderItem[i].EITCOldPromotionId,
                    "val:EITCPromIntegrationId": OrderItem[i].EITCPromIntegrationId,
                    "val:RatePlanCode": OrderItem[i].RatePlanCode,
                    "val:MinimumLot": OrderItem[i].MinimumLot,
                    "val:Note": OrderItem[i].Note,
                    "val:EITCOldAddressStreet": OrderItem[i].EITCOldAddressStreet,
                    "val:EITCOldAddressStreet2": OrderItem[i].EITCOldAddressStreet2,
                    "val:EITCOldAddressType": OrderItem[i].EITCOldAddressType,
                    "val:EITCOldBuildingNo": OrderItem[i].EITCOldBuildingNo,
                    "val:EITCBSCSDepositReferenceId": OrderItem[i].EITCBSCSDepositReferenceId,
                    "val:EITCCustomerDeliveryDate": OrderItem[i].EITCCustomerDeliveryDate,
                    "val:EITCOldQuantity": OrderItem[i].EITCOldQuantity,
                    "val:EITCTechContactLastName": OrderItem[i].EITCTechContactLastName,
                    "val:EITCTechContactFirstName": OrderItem[i].EITCTechContactFirstName,
                    "val:EITCTechContactPhone": OrderItem[i].EITCTechContactPhone,
                    "val:EITCToTechContactFName": OrderItem[i].EITCToTechContactFName,
                    "val:EITCToTechContactLName": OrderItem[i].EITCToTechContactLName,
                    "val:EITCToTechContactPhone": OrderItem[i].EITCToTechContactPhone,
                    "val:EITCToAddressApartNo": OrderItem[i].EITCToAddressApartNo,
                    "val:EITCToAddressBuildingName": OrderItem[i].EITCToAddressBuildingName,
                    "val:EITCToAddressCity": OrderItem[i].EITCToAddressCity,
                    "val:EITCToAddressCountry": OrderItem[i].EITCToAddressCountry,
                    "val:EITCToAddressCounty": OrderItem[i].EITCToAddressCounty,
                    "val:EITCToAddressFloor": OrderItem[i].EITCToAddressFloor,
                    "val:EITCToAddressLandmark": OrderItem[i].EITCToAddressLandmark,
                    "val:EITCToAddressPlot": OrderItem[i].EITCToAddressPlot,
                    "val:EITCToAddressPoBox": OrderItem[i].EITCToAddressPoBox,
                    "val:EITCToAddressStreet": OrderItem[i].EITCToAddressStreet,
                    "val:EITCToAddressStreet2": OrderItem[i].EITCToAddressStreet2,
                    "val:EITCToAddressType": OrderItem[i].EITCToAddressType,
                    "val:EITCToBuildingNo": OrderItem[i].EITCToBuildingNo,
                    "val:EITCToGAID": OrderItem[i].EITCToGAID,
                    "val:EITCOldAddressZone": OrderItem[i].EITCOldAddressZone,
                    "val:EITCAddressZone": OrderItem[i].EITCAddressZone,
                    "val:EITCToSubZone": OrderItem[i].EITCToSubZone,
                    "val:EITCSectorNumber": OrderItem[i].EITCSectorNumber,
                    "val:EITCOldSectorNumber": OrderItem[i].EITCOldSectorNumber,
                    "val:EITCToAddressState": OrderItem[i].EITCToAddressState,
                    "val:EITCOldToAddressCity": OrderItem[i].EITCOldToAddressCity,
                    "val:EITCToOldSubZone": OrderItem[i].EITCToOldSubZone,
                    "val:EITCToOldGAID": OrderItem[i].EITCToOldGAID,
                    "val:EITCOldToPlot": OrderItem[i].EITCOldToPlot,
                    "val:EITCOldToPOBox": OrderItem[i].EITCOldToPOBox,
                    "val:EITCOldToLandmark": OrderItem[i].EITCOldToLandmark,
                    "val:EITCOldToBuildingName": OrderItem[i].EITCOldToBuildingName,
                    "val:EITCOldToApartNo": OrderItem[i].EITCOldToApartNo,
                    "val:EITCOldToAddressState": OrderItem[i].EITCOldToAddressState,
                    "val:EITCOldToAddressFloor": OrderItem[i].EITCOldToAddressFloor,
                    "val:EITCOldToAddressCounty": OrderItem[i].EITCOldToAddressCounty,
                    "val:EITCOldToAddressCountry": OrderItem[i].EITCOldToAddressCountry,
                    "val:UnitofMeasure": OrderItem[i].UnitofMeasure,
                    "val:EITCProdPromType": OrderItem[i].EITCProdPromType,
                    "val:EITCPrimaryProductLine": OrderItem[i].EITCPrimaryProductLine,
                    "val:EITCBillCycles": OrderItem[i].EITCBillCycles,
                    "val:EITCMultipleResources": OrderItem[i].EITCMultipleResources,
                    "val:FieldReplacableUnit": OrderItem[i].FieldReplacableUnit,
                    "val:ListofBitStreamInformation": getBitStreamInformation(OrderItem[i].ListofBitStreamInformation),
                    "val:ListOfOrderItemXa": getOrderItemXa(OrderItem[i].ListOfOrderItemXa) 


                      
            });
    }
  }
  return idOrderItemArray;
}



function getOrderItemXa(ListOfOrderItemXa) {
    // body...
    if (ListOfOrderItemXa) {
        return {
           "val:OrderItemXa": buildOrderItemXaArray(ListOfOrderItemXa.OrderItemXa),
        }
    }else{
        return null;
    }
    
}






function getBitStreamInformation(ListofBitStreamInformation) {
    // body...
    if (ListofBitStreamInformation) {
        return {
          "val:BitStreamInformation":buildBitStreamInformationArray(OrderItem[i].BitStreamInformation),
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
                        "@operation":OrderItemXa[i].operation,
                        "@searchspec":OrderItemXa[i].searchspec,
                        "val:Id": OrderItemXa[i].Id,
                        "val:Created": OrderItemXa[i].Created,
                        "val:Updated": OrderItemXa[i].Updated,
                        "val:ConflictId": OrderItemXa[i].ConflictId,
                        "val:ModId": OrderItemXa[i].ModId,
                        "val:EITCTargetSystemXA": OrderItemXa[i].EITCTargetSystemXA,
                        "val:ActionCode": OrderItemXa[i].ActionCode,
                        "val:IntegrationId": OrderItemXa[i].IntegrationId,
                        "val:Name": OrderItemXa[i].Name,
                        "val:ProductId": OrderItemXa[i].ProductId,
                        "val:Value": OrderItemXa[i].Value,
                        "val:PreviousValue": OrderItemXa[i].PreviousValue     

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
                        
               "val:Name":BitStreamInformation[i].Name,
               "val:Value":BitStreamInformation[i].Value
                   

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
                        

                        "val:Id": Activity[i].Id,
                        "val:Created": Activity[i].Created,
                        "val:Updated": Activity[i].Updated,
                        "val:ConflictId": Activity[i].ConflictId,
                        "val:ModId": Activity[i].ModId,
                        "val:ActivityUID": Activity[i].ActivityUID,
                        "val:Status": Activity[i].Status,
                        "val:Comment": Activity[i].Comment,
                        "val:Description2": Activity[i].Description2,
                        "val:DurationMinutes": Activity[i].DurationMinutes,
                        "val:Planned": Activity[i].Planned,
                        "val:PrimaryOwnedBy": Activity[i].PrimaryOwnedBy,
                        "val:Type": Activity[i].Type,
                        "val:EITCServiceRegion": Activity[i].EITCServiceRegion,
                        "val:IntegrationReturnCode": Activity[i].IntegrationReturnCode,
                        "val:EITCRescheduleReason": Activity[i].EITCRescheduleReason,
                        "val:EITCActivityFailedSequence": Activity[i].EITCActivityFailedSequence

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
            "val:AccountAddress":Address[i].AccountAddress,
            "val:AccountAddressCountry":Address[i].AccountAddressCountry,
            "val:AccountAddressPostalCode":Address[i].AccountAddressPostalCode,
            "val:AccountAddressState":Address[i].AccountAddressState,
            "val:AccountAddressStreet2":Address[i].AccountAddressStreet2,
            "val:AccountAddressCity":Address[i].AccountAddressCity,
            "val:EITCAccountAddressStreet":Address[i].EITCAccountAddressStreet,
            "val:EITCAddressBuildingName":Address[i].EITCAddressBuildingName,
            "val:EITCAddressCounty":Address[i].EITCAddressCounty,
            "val:EITCAddressFloor":Address[i].EITCAddressFloor,
            "val:EITCAddressNearestLandmark":Address[i].EITCAddressNearestLandmark,
            "val:EITCApartmentNumber":Address[i].EITCApartmentNumber,
            "val:EITCBuildingNo":Address[i].EITCBuildingNo,
            "val:EITCAddressZone":Address[i].EITCAddressZone
      });
    }
  }
    return idAddressArray;
}
