var soapObject = {
	"selfcareID":context.getVariable("selfcareId"),
    "customerID":context.getVariable("request.queryparam.customer_id"),
    "agentUserName":context.getVariable("request.queryparam.agent_username"),
    "channelID":context.getVariable("request.queryparam.channel_id"),
};

context.setVariable("request.content", JSON.stringify(soapObject));