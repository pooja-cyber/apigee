var locationUrl = context.getVariable("cmsTGTResponse.header.Location");
var CASHost = context.getVariable("du.config.CASHost");

var tgt = locationUrl.replace("http://"+CASHost, "");
if(tgt){
	context.setVariable("api.casTGTUrl", tgt);
}