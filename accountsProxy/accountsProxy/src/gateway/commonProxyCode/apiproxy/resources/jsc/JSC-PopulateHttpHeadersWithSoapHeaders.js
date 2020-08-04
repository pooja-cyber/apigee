 try{
     var responseString = context.getVariable('response.content');
     var response = JSON.parse(responseString);
     
     for(var prop in response.reply.HEADER){
        //  response.reply.BODY.RESPONSE[prop] = Object.getOwnPropertyNames(response.reply.BODY.RESPONSE[prop] ).length > 0 ?  response.reply.BODY.RESPONSE[prop] : "";
        if(typeof response.reply.HEADER[prop] == "object"){
             response.reply.HEADER[prop] = Object.getOwnPropertyNames(response.reply.HEADER[prop]).length > 0 ?  response.reply.BODY.RESPONSE[prop] : "";
        }
        print(response.reply.HEADER[prop]);
         context.setVariable("response.header."+"X-" + prop, response.reply.HEADER[prop])
     }
     context.setVariable("response.content", JSON.stringify(response.reply.BODY.RESPONSE));
     
 }catch(e){
    context.setVariable('api-error.error', 'ServerError');
	context.setVariable('api-error.code', '500');
	context.setVariable('api-error.reason_phrase', 'Server Error');
	context.setVariable('api-error.status_code', '500');
	context.setVariable('api-error.message', 'Internal Server Error');
	context.setVariable('api-error.exception', e);
	throw new Error();   
 }