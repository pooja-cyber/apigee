var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);

// input = addNamespace(input, "man:");

var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"man" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/ManageEnterpriseOpportunity"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ManageEnterpriseOpportunity":{
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
					"lcew:Body": {
					"man:Listeitcopportunity_Activityio" : 
					{
						"man:Opportunity" : {

				"man:Account": input.Listeitcopportunity_Activityio.Opportunity.Account, 
		        "man:Channel": input.Listeitcopportunity_Activityio.Opportunity.Channel,
		        "man:Comments": input.Listeitcopportunity_Activityio.Opportunity.Comments,
		        "man:AccountCode": input.Listeitcopportunity_Activityio.Opportunity.AccountCode,
		        "man:CustomerAccountIndustry": input.Listeitcopportunity_Activityio.Opportunity.CustomerAccountIndustry,
		        "man:CustomerNumberOfEmployees": input.Listeitcopportunity_Activityio.Opportunity.CustomerNumberOfEmployees,
		        "man:ServiceSubType": input.Listeitcopportunity_Activityio.Opportunity.ServiceSubType,
		        "man:ServiceType": input.Listeitcopportunity_Activityio.Opportunity.ServiceType,
		        "man:ContactEmailAddress": input.Listeitcopportunity_Activityio.Opportunity.ContactEmailAddress,
		        "man:ContactFirstName": input.Listeitcopportunity_Activityio.Opportunity.ContactFirstName,
		        "man:ContactLastName": input.Listeitcopportunity_Activityio.Opportunity.ContactLastName,
		        "man:ContactMobile": input.Listeitcopportunity_Activityio.Opportunity.ContactMobile,
		        "man:MarketSegment": input.Listeitcopportunity_Activityio.Opportunity.MarketSegment,
		        "man:Quantity": input.Listeitcopportunity_Activityio.Opportunity.Quantity,
		        "man:PreferredContactTime": input.Listeitcopportunity_Activityio.Opportunity.PreferredContactTime,
		        "man:Sponsor": input.Listeitcopportunity_Activityio.Opportunity.Sponsor,
		        "man:GroupType": input.Listeitcopportunity_Activityio.Opportunity.GroupType,
		        "man:OpportunityId": input.Listeitcopportunity_Activityio.Opportunity.OpportunityId,
		        "man:OpportunityReferenceNumber": input.Listeitcopportunity_Activityio.Opportunity.OpportunityReferenceNumber,
		        "man:EntityName": input.Listeitcopportunity_Activityio.Opportunity.EntityName,
		   }



						}
					}
				}
			}
		}
	}
};

context.setVariable("request.content", JSON.stringify(soapPayload));

