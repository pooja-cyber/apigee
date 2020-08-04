var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);
// input = addNamespace(input, "chan:");
var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"cre" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/CreateMobileActivation"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:CreateMobileActivation":{
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
	var bodyPayload =   {
	
	        "cre:PortalOrderNumber": input.PortalOrderNumber,
            "cre:CustomerSegment": input.CustomerSegment,
            "cre:AccountIntegrationId": input.AccountIntegrationId,
            "cre:AccountCode": input.AccountCode,
            "cre:OrderAccountType": input.OrderAccountType,
            "cre:ContractCode": input.ContractCode,
            "cre:DealerId": input.DealerId,
            "cre:PartnerDealerId": input.PartnerDealerId,
            "cre:FavouriteId": input.FavouriteId,
            "cre:EmailAddress": input.EmailAddress,
            "cre:WithHoldDirectoryListing": input.WithHoldDirectoryListing,
            "cre:ContactFirstName": input.ContactFirstName,
            "cre:ContactLastName": input.ContactLastName,
            "cre:ActivationReason": input.ActivationReason,
            "cre:ListOfResources": getListOfResources(input.ListOfResources), 

             "cre:ListOfOffers": getListOfOffers(input.ListOfOffers),

             "cre:ListOfObjects" : getListOfObjects(input.ListOfObjects), 

             "cre:ListOfActivities" : getListOfActivities(input.ListOfActivities)


	}
  bodyPayload =deleteNullUndefined(bodyPayload, "");
    return bodyPayload;
}


function getListOfResources(ListOfResources) {
    // body...
    if (ListOfResources) {
        return {

                "cre:SIMCard": getSIMCard(ListOfResources.SIMCard),
                "cre:Resource":getResource(ListOfResources.Resource)

                }
        
    }else{
        return null;
    }
    
}





function getResource(Resource) {
    // body...
    if (Resource) {
        return {
 
                "cre:BookingId": Resource.BookingId,
                "cre:DNId": Resource.DNId,
                "cre:NumberType": Resource.NumberType,
                "cre:Resource": Resource.Resource,
                "cre:CommitmentPeriod": Resource.CommitmentPeriod,
                "cre:CommitmentValue": Resource.CommitmentValue


                }
        
    }else{
        return null;
    }
    
}






function getSIMCard(SIMCard) {
    // body...
    if (SIMCard) {
        return {
 
                "cre:StorageMediumNumber": SIMCard.StorageMediumNumber,
                "cre:PortNumber": SIMCard.PortNumber,
                "cre:StorageMediumId": SIMCard.StorageMediumId,
                "cre:Type": SIMCard.Type
                 


                }
        
    }else{
        return null;
    }
    
}







function getListOfOffers(ListOfOffers) {
    // body...
    if (ListOfOffers) {
        return {

 
                  "cre:HandsetOffer" : buildHandsetOfferArray(ListOfOffers.HandsetOffer),
                  "cre:ProductOffer" : buildProductOfferArray(ListOfOffers.ProductOffer),
                  "cre:DealerOffer"  : buildDealerOfferArray(ListOfOffers.DealerOffer),


                }
        
    }else{
        return null;
    }
    
}





function getListOfObjects(ListOfObjects) {
    // body...
    if (ListOfObjects) {
        return {

              "cre:Object" : buildObjectArray(ListOfObjects.Object)
                }
        
    }else{
        return null;
    }
    
}




function getListOfActivities(ListOfActivities) {
    // body...
    if (ListOfActivities) {
        return {

               "cre:Activity" : buildActivityArray(ListOfActivities.Activity) 
                }
                          
    }else
    {
        return null;
    }
    
}













function buildActivityArray(Activity){
  var idActivityArray = [];
  if(Activity){
    for (var i = 0; i < Activity.length; i++) {
      idActivityArray.push({

                "cre:Status": Activity[i].Status,
                "cre:Description": Activity[i].Description,
                "cre:Owned": Activity[i].Owned,
                "cre:Type": Activity[i].Type
                                
            });
    }
  }
      return idActivityArray;
}






function buildObjectArray(Object){
  var idObjectArray = [];
  if(Object){
    for (var i = 0; i < Object.length; i++) {
      idObjectArray.push({

                "cre:Id": Object[i].Id,
                "cre:IsToSendEmail": Object[i].IsToSendEmail
                                
            });
    }
  }
      return idObjectArray;
}




function buildDealerOfferArray(DealerOffer){
  var idDealerOfferArray = [];
  if(DealerOffer){
    for (var i = 0; i < DealerOffer.length; i++) {
      idDealerOfferArray.push({

                "cre:OfferType": DealerOffer[i].OfferType,
                "cre:OfferName": DealerOffer[i].OfferName,
                "cre:OfferValue": DealerOffer[i].OfferValue
                                
            });
    }
  }
      return idDealerOfferArray;
}


function buildProductOfferArray(ProductOffer){
  var idProductOfferArray = [];
  if(ProductOffer){
    for (var i = 0; i < ProductOffer.length; i++) {
      idProductOfferArray.push({
                        
                  "cre:OfferId": ProductOffer[i].OfferId,
                  "cre:OfferName": ProductOffer[i].OfferName
                                
            });
    }
  }
      return idProductOfferArray;
}




function buildHandsetOfferArray(HandsetOffer){
  var idHandsetOfferArray = [];
  if(HandsetOffer){
    for (var i = 0; i < HandsetOffer.length; i++) {
      idHandsetOfferArray.push({
                        
                "cre:ContractTerm": HandsetOffer[i].ContractTerm,
                "cre:OfferId": HandsetOffer[i].OfferId,
                "cre:OfferName": HandsetOffer[i].OfferName,
                "cre:HandsetName": HandsetOffer[i].HandsetName,
                "cre:HandsetBundleType": HandsetOffer[i].HandsetBundleType,
                "cre:IMEI": HandsetOffer[i].IMEI
                                
            });
    }
  }
      return idHandsetOfferArray;
}