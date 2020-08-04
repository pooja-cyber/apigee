var inputJson = context.getVariable("aes.response");
inputJson = JSON.parse(inputJson);
inputJson.username = context.getVariable("du.config.selfcareUsername");
context.setVariable("aes.response", JSON.stringify(inputJson));
