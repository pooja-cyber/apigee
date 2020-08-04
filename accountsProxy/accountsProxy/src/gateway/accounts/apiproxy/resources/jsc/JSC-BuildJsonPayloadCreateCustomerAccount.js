var inputJson = context.getVariable("request.content");
var input = JSON.parse(inputJson);
// input = addNamespace(input, "cre:");

var soapPayload = {
  "soapenv:Envelope": {
   "#namespaces":{
      "soapenv": "http://schemas.xmlsoap.org/soap/envelope/" ,
      "web"  : "http://www.webservices.com/LCE/Du/WebServices" ,
      "head" :"http://www.du.ae/LCE/Header" ,
      "lcew" :"http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
      "cre"  :"http://xmlns.du.ae/LCE/Business/AccountManagement/CreateCustomerAccount"
    },
    "soapenv:Header":{},
    "soapenv:Body": {
      "web:CreateCustomerAccount": {
        "Request": {
            "head:Header": {
            "head:RequestId": context.getVariable("du.api.requestId"),
              "head:Credentials": {
                "head:ApplicationId": context.getVariable("du.config.applicationId"),
                "head:User": context.getVariable("du.config.mceUsername"),
                "head:Password": context.getVariable("du.config.mcePassword")
              },
            "head:CorrelationId": "",
          },
          "lcew:Body": 
            {
            "cre:ContactDetails": {
              "cre:DocumentNumber": input.ContactDetails.DocumentNumber,
              "cre:DocumentType": input.ContactDetails.DocumentType,
              "cre:UnifiedNumber": input.ContactDetails.UnifiedNumber,
              "cre:PassportNumber": input.ContactDetails.PassportNumber,
              "cre:AbsherId": input.ContactDetails.AbsherId,
              "cre:FirstName": input.ContactDetails.FirstName,
              "cre:LastName": input.ContactDetails.LastName,
              "cre:ArabicName": input.ContactDetails.ArabicName,
              "cre:Address": {
                "cre:Country": input.ContactDetails.Address.Country,
                "cre:StreetName": input.ContactDetails.Address.StreetName,
                "cre:AddressDetails1": input.ContactDetails.Address.AddressDetails1,
                "cre:Unit": input.ContactDetails.Address.Unit,
                "cre:PO_BOX": input.ContactDetails.Address.PO_BOX,
                "cre:Emirate": input.ContactDetails.Address.Emirate,
                "cre:City": input.ContactDetails.Address.City,
                "cre:Area": input.ContactDetails.Address.Area
              },
              "cre:DateOfBirth": input.ContactDetails.DateOfBirth,
              "cre:Nationality": input.ContactDetails.Nationality,
              "cre:Email": input.ContactDetails.Email,
              "cre:PhoneNumber": input.ContactDetails.PhoneNumber,
              "cre:Gender": input.ContactDetails.Gender,
              "cre:Title": input.ContactDetails.Title,
              "cre:MonthlyIncome": input.ContactDetails.MonthlyIncome,
              "cre:GuestMilesID": input.ContactDetails.GuestMilesID
            },
            "cre:EmployeeID": input.EmployeeID,
            "cre:CompanyName": input.CompanyName,
            "cre:ExpiryDate": input.ExpiryDate,
            "cre:IssueDate": input.IssueDate,
            "cre:AccountType": input.AccountType,
            "cre:MarketType": input.MarketType,
            "cre:InvoiceType": input.InvoiceType,
            "cre:InvoiceLanguage": input.InvoiceLanguage,
            "cre:ParentAccountID": input.ParentAccountID,
            "cre:PersonalizedOffers": input.PersonalizedOffers,
            "cre:VisaType": input.VisaType,
            "cre:VisaExpiryDate": input.VisaExpiryDate,
            "cre:VisaNumber": input.VisaNumber
          }
          }
        }
      }
    }
}; // End of soapPayload

context.setVariable("request.content", JSON.stringify(soapPayload));

