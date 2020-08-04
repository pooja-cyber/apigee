//Checks if the document is present in SANStorage and gets the directory name , then calls the SANStorage to download the file. if available

var directoryList = context.getVariable("du.config.directoryList");
var documentRefNumber = context.getVariable("documentRefNumber");
var dirArray = directoryList.split(",");
var exchObjArray = [];
//Set Request Headers
var client_key = context.getVariable("du.config.clientKey");
var client_secret = context.getVariable("du.config.clientSecret");
var clientKeySecretEncode = client_key+":"+client_secret;
var headerEncode = Base64.encode(clientKeySecretEncode)
var authHeader = "Basic "+headerEncode;
var requestHeaders = {'Authorization' : authHeader};

//URL of SANStorage
var sanStorageUrl = context.getVariable("du.config.sanStorageUrl");

//Variable to route the request to local proxy chaining
var routeRequest = "local";
	for (var i = 0; i < dirArray.length; i++) {
		// exchObjArray.push(httpClient.get("/files?dir_name="+dirArray[i]+"&file_name="+documentRefNumber+".xml&operation=exists"));
		var url = sanStorageUrl+"?dir_name="+dirArray[i]+"&file_name="+documentRefNumber+".xml&operation=exists";
		var operation = "GET";
		var request = new Request(url,operation,requestHeaders);
		exchObjArray.push(httpClient.send(request));
	}

	for (var i = 0; i < exchObjArray.length; i++) {
		exchObjArray[i].waitForComplete();
		if (exchObjArray[i].isComplete()) {
		    var response = exchObjArray[i].getResponse().content;
		    print(response);
			if(response == "true"){
			    var fileAvailableInDir = dirArray[i];
			    break;
			}
		}
	}

		if (fileAvailableInDir) {

			context.setVariable("fileInDirectory",fileAvailableInDir);
			context.setVariable("searchFileName",documentRefNumber+".xml");
			context.setVariable("authHeader",authHeader);
			context.setVariable("du.api.route_request",routeRequest);

		}
		else{

			context.setVariable('api-error.code', 'NB_40002');
			context.setVariable('api-error.error', 'File Not Found');
			context.setVariable('api-error.message', 'XML File not found in given directories');
			context.setVariable('api-error.status_code', '400');
			context.setVariable('api-error.reason_phrase', 'Bad Request');
			throw new Error();
		}