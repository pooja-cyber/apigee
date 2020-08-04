// Checks if the document is available in SANStorage

var directoryList = context.getVariable("du.config.directoryList");
var dirArray = directoryList.split(",");
var searchDir = dirArray[0];

//Fetching documentReferenceNumber from response
var input = context.getVariable("response.content");
input = JSON.parse(input);
var docListObj = input.Envelope.Body.GetBillInformationResponse.Response.Body.DocumentsList ? input.Envelope.Body.GetBillInformationResponse.Response.Body.DocumentsList : {};

//Building Header Variables
var client_key = context.getVariable("du.config.clientKey");
var client_secret = context.getVariable("du.config.clientSecret");
var clientKeySecretEncode = client_key+":"+client_secret;
var headerEncode = Base64.encode(clientKeySecretEncode)
var authHeader = "Basic "+headerEncode;

//URL of SANStorage
var sanStorageUrl = context.getVariable("du.config.sanStorageUrl");

//Sending Request to SANStorage proxy for checking the availability of file
		if (docListObj.DocumentReferenceNumber) {
			//Request to search for .pdf
			var requestHeaders = {'Authorization' : authHeader};
			var requestPdf = new Request(sanStorageUrl+"?dir_name="+searchDir+"&file_name="+documentRefNumber+".pdf&operation=exists","GET",requestHeaders);
			var exchangeObjPdf = httpClient.send(requestPdf);

			//Request to search for .xml
			var requestXml = new Request(sanStorageUrl+"?dir_name="+searchDir+"&file_name="+documentRefNumber+".xml&operation=exists","GET",requestHeaders);
			var exchangeObjXml = httpClient.send(requestXml);


			exchangeObjPdf.waitForComplete();
			exchangeObjXml.waitForComplete();


					if (exchangeObjPdf.isSuccess() || exchangeObjXml.isSuccess()) {
							   if (exchangeObjXml.getResponse().content == "true" || exchangeObjPdf.getResponse().content == "true") {
							   		input.Envelope.Body.GetBillInformationResponse.Response.Body.DocumentAvailable = "true";
							   		context.setVariable("response.content", JSON.stringify(input));			
							   }
					}

		}
		else{
		input.Envelope.Body.GetBillInformationResponse.Response.Body.DocumentAvailable = "false";
		context.setVariable("response.content", JSON.stringify(input));			
		}