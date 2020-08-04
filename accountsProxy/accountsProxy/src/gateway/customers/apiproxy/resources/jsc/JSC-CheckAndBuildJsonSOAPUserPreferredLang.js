var requestBody = context.getVariable("request.content");
if(requestBody){
       requestBody = JSON.parse(requestBody);
        if(!requestBody.IvrLanguage){
        context.setVariable('api-error.code', 'NB_40002');
        context.setVariable('api-error.error', 'MissingParameters');
        context.setVariable('api-error.message', 'IvrLanguage is required in body payload');
        context.setVariable('api-error.status_code', '400');
        context.setVariable('api-error.reason_phrase', 'Bad Request');
        throw new Error();
    }
    
    var soapRequest = {
        "soapenv:Envelope":{
            "#namespaces":{
                "soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
                "web" : "http://www.webservices.com/LCE/Du/WebServices",
                "head" : "http://www.du.ae/LCE/Header",
                "lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest",
                "set" : "http://xmlns.du.ae/LCE/Business/AccountManagement/SetUserPreferredLanguage"
            },
            "soapenv:Header" : {},
            "soapenv:Body" : {
                "web:SetUserPreferredLanguage" : {
                    "Request" : {
                        "head:Header" : {
                            "head:RequestId" : context.getVariable("du.api.requestId"),
                            "head:Credentials" : {
                                "head:ApplicationId" : context.getVariable("du.config.applicationId"),
                                "head:User" : context.getVariable("du.config.mceUsername"),
                                "head:Password" : context.getVariable("du.config.mcePassword"),
                            },
                            "head:CorrelationId" : ""
                        },
                        "lcew:Body":{
                            "set:DirNum" : requestBody.DirNum,
                            "set:IvrLanguage" : requestBody.IvrLanguage,
                            "set:BscsConType" : requestBody.BscsConType,
                        }             
                    }
                }
            }
        }
    };

    context.setVariable("request.content", JSON.stringify(soapRequest));

}else{
    context.setVariable('api-error.code', 'NB_40002');
    context.setVariable('api-error.error', 'BodyPayloadMissing');
    context.setVariable('api-error.message', 'Json Payload with DirNum and IvrLanguage is required');
    context.setVariable('api-error.status_code', '400');
    context.setVariable('api-error.reason_phrase', 'Bad Request');
    throw new Error();
}