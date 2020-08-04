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
			"cre" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/CreateMultiLineMobileActivation"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:CreateMultiLineMobileActivation":{
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

            "cre:ClientId":input.ClientId,
            "cre:CustomerSegment":input.CustomerSegment,
            "cre:Nationality":input.Nationality,
            "cre:DocumentType":input.DocumentType,
            "cre:DocumentId":input.DocumentId,
            "cre:PartnerDealerId":input.PartnerDealerId,
            "cre:DealerId":input.DealerId,
            "cre:AccountIntegrationId":input.AccountIntegrationId,
            "cre:AccountCode":input.AccountCode,
            "cre:SalesmanId":input.SalesmanId,
            "cre:EmailAddress":input.EmailAddress,
            "cre:ContactFirstName":input.ContactFirstName,
            "cre:ContactLastName":input.ContactLastName,
            "cre:DocumentObjectId":input.DocumentObjectId,
            "cre:SendEmailFlag":input.SendEmailFlag,
            "cre:ListOfLines": getListOfLines(input.ListOfLines)
             


	}

   bodyPayload =deleteNullUndefined(bodyPayload, "");
    return bodyPayload;
}






function getListOfLines(ListOfLines) {
    // body...
    if (ListOfLines) {
        return {
                "cre:Line": buildLineArray(ListOfLines.Line)
                }
        
    }else{
        return null;
    }
    
}

function buildLineArray(Line){
  var idLineArray = [];
  if(Line){
    for (var i = 0; i < Line.length; i++) {
      idLineArray.push({

                "cre:ContractCode":Line[i].ContractCode,
                "cre:FavouriteId":Line[i].FavouriteId,
                "cre:WithHoldDirectoryListing":Line[i].WithHoldDirectoryListing,
                "cre:PortalOrderNumber":Line[i].PortalOrderNumber,
                "cre:ListOfResources": getListOfResources(Line[i].ListOfResources)
                
            });
    }
  }
      return idLineArray;
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
