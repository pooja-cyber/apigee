 /**
  * Calculate and set response time for ping resource
  */

 var requestStartTime = context.getVariable('client.received.start.timestamp');
 var currentTime = new Date().valueOf();
 
 var responseTime = currentTime - requestStartTime;
 context.setVariable('responseTime', responseTime);