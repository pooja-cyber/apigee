var input = {}
var public_id  = context.getVariable("request.queryparam.public_id");
var service_id = context.getVariable("request.queryparam.service_id");
var from_creation_date = context.getVariable("request.queryparam.from_creation_date");
var to_creation_date = context.getVariable("request.queryparam.to_creation_date");
var dealer = context.getVariable("request.queryparam.dealer");
var outlet = context.getVariable("request.queryparam.outlet");
var user = context.getVariable("request.queryparam.user");
var status = context.getVariable("request.queryparam.status");
var customer_type = context.getVariable("request.queryparam.customer_type");
var account_id = context.getVariable("request.queryparam.account_id");
var index = context.getVariable("request.queryparam.index");
var number_of_results = context.getVariable("request.queryparam.number_of_results");

	if(public_id){
		input.PublicId = public_id;
	}

	if(service_id){
		input.ServiceId = service_id;
	}

	if(from_creation_date){
		input.FromCreationDate = from_creation_date;
	}

	if(to_creation_date){
		input.ToCreationDate = to_creation_date;
	}


	if(dealer){
		input.ListOfDealers = { "Dealer" : dealer};
	}

    if(outlet){
		input.ListOfOutlets = { "Outlet" : outlet};
	}

	if(user){
		input.ListOfUsers = { "User" : user};
	}
    
    if(status){
		input.ListOfStatus = { "Status" : status};
	}
    
 
   if(customer_type){
		input.CustomerType = customer_type;
	}

	if(account_id){
		input.AccountId = account_id;
	}

     if(index){
		input.Index = index;
	}

     if(number_of_results){
		input.NumberOfResults = number_of_results;
	}


input = addNamespace(input, "get:");

var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"get" : "http://xmlns.du.ae/LCE/Business/RequestManagement/GetOMPOrders"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:MNPGetRequestInfo":{
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
					"lcew:Body": input
				}
			}
		}
	}
};

context.setVariable("request.content", JSON.stringify(soapPayload));
context.setVariable("request.header.Content-Type", "application/json");
