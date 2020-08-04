/**
 * Remove the path suffix from target endpoint calls
 */

context.setVariable('target.copy.pathsuffix', false);
context.getVariable("request.content");