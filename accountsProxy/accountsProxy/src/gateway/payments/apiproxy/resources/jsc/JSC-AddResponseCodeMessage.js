var aesResponse = context.getVariable("aes.response");
aesResponse = JSON.parse(aesResponse);
aesResponse.responseCode = context.getVariable("du.api.responseCode");
aesResponse.responseDescription = context.getVariable("du.api.responseDescription");
context.setVariable("response.content", JSON.stringify(aesResponse));