var message = "";
var accessToken = {};
accessToken.customerId = context.getVariable("accesstoken.customer_id");
accessToken.contractId = context.getVariable("accesstoken.contract_id");
accessToken.msisdns = context.getVariable("accesstoken.msisdns");
var queryParams = {};
queryParams.customer_id = context.getVariable("request.queryparam.customer_id");

queryParams.contract_id = context.getVariable("request.queryparam.contract_id");

queryParams.msisdn = context.getVariable("request.queryparam.msisdn");

var found = false;
var array = [];
print("result of contract_id : " + ( queryParams.contract_id && accessToken.contractId ) );
print("result of msisdn : " + (queryParams.msisdn && accessToken.msisdns));

switch(true){
    case (queryParams.customer_id) && 
        (queryParams.customer_id != accessToken.customerId):
        print("Customer Id", queryParams.customerId);
        message = "Customer Id does not match Access token Customer Id";
        break;

    case (queryParams.contract_id != null) && (accessToken.contractId != null):
        array = accessToken.contractId.split(",");
        for (var i = 0; i < array.length; i++) {
            if(array[i] == queryParams.contract_id){
                found = true;
                break;
            }
        }
        print("Found in contract id : " + found);
        if(!found){
            message = "Contract Id does not match Access token Contract Id";    
        }
        
        break;
    case (queryParams.msisdn != null) && (accessToken.msisdns != null):
        array = accessToken.msisdns.split(",");
        for (var i = 0; i < array.length; i++) {
            if(array[i] == queryParams.msisdn){
                found = true;
                break;
            }
        }
        print("Found in MSISDN : " + found);
        if(!found){
         message = "MSISDN not in Access token MSISDNs";   
        }
        break;   
}
print("Message : " + message);
if (message) {
    context.setVariable('api-error.code', 'NB_40100');
    context.setVariable('api-error.error', 'TokenAttributeMissMatch');
    context.setVariable('api-error.message', message);
    context.setVariable('api-error.status_code', '401');
    context.setVariable('api-error.reason_phrase', 'Unauthorized');
    throw new Error();
}