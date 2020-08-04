var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);
// input = addNamespace(input, "chan:");
input.PortalOrderNumber = context.getVariable("portalOrderNumber");
var soapPayload = {
  "soapenv:Envelope" : {
    "#namespaces":{
      "soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
      "web" : "http://www.webservices.com/LCE/Du/WebServices",
      "head" : "http://www.du.ae/LCE/Header",
      "lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
      "man" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/ManageOffers"
    },
    "soapenv:Header":{},
    "soapenv:Body":{
      "web:ManageOffers":{
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
  return {

          "man:PortalOrderNumber": input.PortalOrderNumber,
            "man:CustomerSegment": input.CustomerSegment,
            "man:AccountIntegrationId": input.AccountIntegrationId,
            "man:AccountCode": input.AccountCode,
            "man:ContractCode": input.ContractCode,
            "man:RateplanType": input.RateplanType,
            "man:AccountType": input.AccountType,
            "man:DealerId": input.DealerId,
            "man:PrimaryServiceId": input.PrimaryServiceId,
            "man:EmailAddress": input.EmailAddress,
            "man:ContactFirstName": input.ContactFirstName,
            "man:ContactLastName": input.ContactLastName,
            "man:ListOfOffers": getListOfOffers(input.ListOfOffers),
            "man:ListOfObjects": getListOfObjects(input.ListOfObjects),
            "man:ListOfActivities": getListOfActivities(input.ListOfActivities)
      
  }
}






function getListOfActivities(ListOfActivities) {
    // body...
    if (ListOfActivities) {
        return {
         "man:Activity" :buildActivityArray(ListOfActivities.Activity),
        }
    }else{
        return null;
    }
    
}




function getListOfObjects(ListOfObjects) {
    // body...
    if (ListOfObjects) {
        return {
         "man:Object" :buildObjectArray(ListOfObjects.Object),
        }
    }else{
        return null;
    }
    
}






function getListOfOffers(ListOfOffers) {
    // body...
    if (ListOfOffers) {
        return {
        "man:HandsetOffer" :buildHandsetOfferArray(ListOfOffers.HandsetOffer),
        "man:ProductOffer" :buildProductOfferArray(ListOfOffers.ProductOffer),
        }
        }
        else
        {
        return null;
    }
    
}




function buildActivityArray(Activity){
  var idActivityArray = [];
  if(Activity){
    for (var i = 0; i < Activity.length; i++) {
      idActivityArray.push({

                "man:Status":Activity[i].Status,
                "man:Description":Activity[i].Description,
                "man:Owned":Activity[i].Owned,
                "man:Type":Activity[i].Type

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

                "man:Id": Object[i].Id,
                "man:IsToSendEmail": Object[i].IsToSendEmail


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

                "man:OfferIdOld": ProductOffer[i].OfferIdOld,
                "man:OfferNameOld": ProductOffer[i].OfferNameOld,
                "man:OfferId": ProductOffer[i].OfferId,
                "man:OfferName": ProductOffer[i].OfferName,
                "man:Action": ProductOffer[i].Action,
                "man:Renewal_Type": ProductOffer[i].Renewal_Type,
                "man:Renewal_Option": ProductOffer[i].Renewal_Option,
                "man:From_Offer": ProductOffer[i].From_Offer



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

              "man:ContractTerm": HandsetOffer[i].ContractTerm,
                "man:OfferId": HandsetOffer[i].OfferId,
                "man:OfferName": HandsetOffer[i].OfferName,
                "man:HandsetName": HandsetOffer[i].HandsetName,
                "man:HandsetBundleType": HandsetOffer[i].HandsetBundleType,
                "man:IMEI": HandsetOffer[i].IMEI,
                "man:Action": HandsetOffer[i].Action,
                "man:StartDate": HandsetOffer[i].StartDate,
                "man:EndDate": HandsetOffer[i].EndDate,
                "man:Renewal_Type": HandsetOffer[i].Renewal_Type,
                "man:Renewal_Option": HandsetOffer[i].Renewal_Option,
                "man:From_Offer": HandsetOffer[i].From_Offer
                                
            });
    }
  }
      return idHandsetOfferArray;
}


