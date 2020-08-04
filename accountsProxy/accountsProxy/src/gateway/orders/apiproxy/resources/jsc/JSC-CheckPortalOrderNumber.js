var orderNumber = context.getVariable('portalOrderNumber');

if(!orderNumber){
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'MissingParameter');
    context.setVariable('api-error.message', 'PortalorderNumber  is  required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
    
}