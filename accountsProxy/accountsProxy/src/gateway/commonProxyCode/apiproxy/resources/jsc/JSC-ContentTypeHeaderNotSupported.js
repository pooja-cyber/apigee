
var contentType = context.getVariable("request.header.Content-Type");
 context.setVariable("api-error.error", "Content-Type Not Supported");
 context.setVariable("api-error.code", "NB_4000");
 context.setVariable("api-error.message", "Request Content-Type ("+ contentType+") not supported. Supported content type is application/json.");
 context.setVariable("api-error.status_code", "400");
 context.setVariable("api-error.reason_phrase", "Bad Request");
 throw new Error();
