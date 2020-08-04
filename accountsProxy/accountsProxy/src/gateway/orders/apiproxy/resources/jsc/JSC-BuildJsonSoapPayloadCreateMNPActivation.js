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
			"cre" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/CreateMNPActivation"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:CreateMNPActivation":{
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
	
	        "cre:PortalOrderNumber": input.PortalOrderNumber,
            "cre:CustomerSegment": input.CustomerSegment,
            "cre:DocumentType": input.DocumentType,
            "cre:DocumentId": input.DocumentId,
            "cre:AccountIntegrationId": input.AccountIntegrationId,
            "cre:AccountCode": input.AccountCode,
            "cre:OrderAccountType": input.OrderAccountType,
            "cre:DealerId": input.DealerId,
            "cre:PartnerDealerId": input.PartnerDealerId,
            "cre:FavouriteId": input.FavouriteId,
            "cre:WithHoldDirectoryListing": input.WithHoldDirectoryListing,
            "cre:PortabilityDate": input.PortabilityDate,
            "cre:Comments": input.Comments,
            "cre:IsPortBack": input.IsPortBack,
            "cre:EmailAddress": input.EmailAddress,
            "cre:ContactFirstName": input.ContactFirstName,
            "cre:ContactLastName": input.ContactLastName,
            "cre:ListOfResources": getListOfResources(input.ListOfResources),
            "cre:ListOfOffers": getListOfOffers(input.ListOfOffers),
            "cre:ListOfActivities" :getListOfActivities(input.ListOfActivities),
            "cre:ListOfObjects" :getListOfObjects(input.ListOfObjects)
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

              "cre:DNId": Resource.DNId,
              "cre:Resource": Resource.Resource
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
        }
    else{
        return null;
    }
    
}





function getListOfActivities(ListOfActivities) {
    // body...
    if (ListOfActivities) {
        return {

                "cre:Activity" :getActivity(ListOfActivities.Activity)
        }
    }else{
        return null;
    }
    
}





function getActivity(Activity) {
    // body...
    if (Activity) {
        return {
       "cre:Id" :Activity.Id 
        }
    }else{
        return null;
    }
    
}






function getListOfOffers(ListOfOffers) {
    // body...
    if (ListOfOffers) {
        return {
         "cre:HandsetOffer" :buildActivityArray(ListOfOffers.Activity),
         "cre:ProductOffer" :buildProductOfferArray(ListOfOffers.ProductOffer)
        }
    }else{
        return null;
    }
    
}




function getListOfObjects(ListOfObjects) {
    // body...
    if (ListOfObjects) {
        return {
        "cre:Object" : buildObjectArray(ListOfObjects.Object),
        }
    }else{
        return null;
    }
    
}






function buildObjectArray(Object){
  var idObjectArray = [];
  if(Object){
    for (var i = 0; i < Object.length; i++) {
      idObjectArray.push({
                        
                "cre:Id": Object[i].Id,
                "cre:Type": Object[i].Type,
                "cre:IsToSendEmail": Object[i].IsToSendEmail
                                
            });
    }
  }
      return idObjectArray;
}



function buildProductOfferArray(ProductOffer){
  var idProductOfferArray = [];
  if(ProductOffer){
    for (var i = 0; i < ProductOffer.length; i++) {
      idProductOfferArray.push({
                        
                "cre:OfferId": ProductOffer[i].OfferId,
                "cre:OfferName": ProductOffer[i].OfferName,
                                
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