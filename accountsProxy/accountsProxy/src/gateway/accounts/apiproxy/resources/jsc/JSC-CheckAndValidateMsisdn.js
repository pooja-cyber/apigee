
var accesstoken_msisdns = context.getVariable("accesstoken.msisdns");
var msisdn = context.getVariable('request.queryparam.msisdn');


var isFound = false;
if(msisdn)
{
    var arrayMsisdn = accesstoken_msisdns.split(',');
    for (var i = 0; i < arrayMsisdn.length; i++) {
        if(arrayMsisdn[i] == msisdn){
            isFound = true; 
            break;
        }
    }
    if(!isFound){
        context.setVariable('api-error.code', 'NB_40100');
        context.setVariable('api-error.error', 'AccesstokenAttributeMissMatch');
        context.setVariable('api-error.message', 'MSISDN does not match with Registered MSISDN');
        context.setVariable('api-error.status_code', '401');
        context.setVariable('api-error.reason_phrase', 'Unauthorized Access');
        throw new Error();
    }

	
}else if(!accesstoken_msisdns){
    context.setVariable('api-error.code', 'NB_40100');
    context.setVariable('api-error.error', 'MSISDNisNotRegistered');
    context.setVariable('api-error.message', 'No MSISDN was Registered');
    context.setVariable('api-error.status_code', '401');
    context.setVariable('api-error.reason_phrase', 'Unauthorized Access'); 
    throw new Error();
}