/**
 * 
 */
package com.du.api;

import java.awt.PageAttributes.MediaType;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.lang.text.StrSubstitutor;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.Message;
import com.apigee.flow.message.MessageContext;
import com.du.api.utill.TemplateString;

/**
 * @author mzuber
 *
 */
public class SANFileOperations implements Execution {
	private static final String _varPrefix = "san_";
	private Map properties; // read-only
	private enum Operations {
        Upload,Download,Exists;
    }
	public SANFileOperations (Map properties) {
        this.properties = properties;
    }
	
	private static final String varName(String s){ return _varPrefix + s; }
	
	private boolean getDebug() {
        String value = (String) this.properties.get("debug");
        if (value == null) return false;
        if (value.trim().toLowerCase().equals("true")) return true;
        return false;
    }
	
	private String getSimpleRequiredProperty(String propName, MessageContext msgCtxt) throws Exception {
        String value = (String) this.properties.get(propName);
        if (value == null) {
            throw new IllegalStateException(propName + " resolves to an empty string.");
        }
        value = value.trim();
        if (value.equals("")) {
            throw new IllegalStateException(propName + " resolves to an empty string.");
        }
        value = resolvePropertyValue(value, msgCtxt);
        if (value == null || value.equals("")) {
            throw new IllegalStateException(propName + " resolves to an empty string.");
        }
        return value;
    }
	
	private String getSimpleOptionalProperty(String propName, MessageContext msgCtxt) throws Exception {
        String value = (String) this.properties.get(propName);
        if (value == null) { return null; }
        value = value.trim();
        if (value.equals("")) { return null; }
        value = resolvePropertyValue(value, msgCtxt);
        if (value == null || value.equals("")) { return null; }
        return value;
    }
	
	private String getFileName(MessageContext msgContext) throws Exception{
		return getSimpleRequiredProperty("file-name", msgContext);
	}
	
	private String getDirectoryName(MessageContext msgContext) throws Exception {
		return getSimpleRequiredProperty("dir-name", msgContext);
	}
	
	private Operations getOperation(MessageContext msgContext) throws Exception {
		String operation = getSimpleRequiredProperty("operation", msgContext);
		operation = operation.toLowerCase();
		switch (operation) {
		case "upload":
			return Operations.Upload;
		case "download":
			return Operations.Download;
		case "exists":
			return Operations.Exists;

		default:
			throw new IllegalStateException("operation value is unknown : (" + operation + ")");
		}
	}
	
	private void uploadFile(MessageContext msgContext) throws Exception{
		String fileName = getFileName(msgContext);
		String dirName = getDirectoryName(msgContext);
		File file = new File(dirName, fileName);
		if(file.exists()){
			throw new Exception("File with same name already present: (" + file.getAbsolutePath() + ")"  );
		}
		InputStream initialStream = msgContext.getMessage().getContentAsStream();
		byte[] buffer = new byte[initialStream.available()];
	    initialStream.read(buffer);
	    OutputStream outStream = new FileOutputStream(file);
	    outStream.write(buffer);
	    outStream.close();
	}
	
	private void downloadFile(MessageContext msgContext) throws Exception{
		String fileName = getFileName(msgContext);
		String dirName = getDirectoryName(msgContext);
		File file = new File(dirName, fileName);
		if(!file.exists()){
			throw new Exception("File does not exists: (" + file.getAbsolutePath() + ")"  );
		}
		InputStream inputStream = new FileInputStream(file);
		Path path = file.toPath();
		Files.probeContentType(path);
		msgContext.getResponseMessage().setHeader("Content-Type", Files.probeContentType(path));
		msgContext.getResponseMessage().setContent(inputStream);
	}
	
	private boolean isFileExists(MessageContext msgContext) throws Exception{
		String fileName = getFileName(msgContext);
		String dirName = getDirectoryName(msgContext);
		File file = new File(dirName, fileName);
		String outputVariable = getOutputVar(msgContext);
		boolean fileExists = file.exists();
		msgContext.setVariable(outputVariable, fileExists);
		return fileExists;
	}
	
	private String getOutputVar(MessageContext msgCtxt) throws Exception {
        String dest = getSimpleOptionalProperty("output-variable", msgCtxt);
        if (dest == null) {
            return "message.content";
        }
        return dest;
    }
	
	private void setErrorMessage(String error, String code, String message, String reason, String statusCode, MessageContext msgContext){
		msgContext.setVariable("api-error.error", error);
		msgContext.setVariable("api-error.code", code);
		msgContext.setVariable("api-error.message", message);
		msgContext.setVariable("api-error.reason_phrase", reason);
		msgContext.setVariable("api-error.status_code", statusCode);
	}
	// If the value of a property value begins and ends with curlies,
    // eg, {apiproxy.name}, then "resolve" the value by de-referencing
    // the context variable whose name appears between the curlies.
    private String resolvePropertyValue(String spec, MessageContext msgCtxt) {
        if (spec.indexOf('{') > -1 && spec.indexOf('}')>-1) {
            // Replace ALL curly-braced items in the spec string with
            // the value of the corresponding context variable.
            TemplateString ts = new TemplateString(spec);
            Map<String,String> valuesMap = new HashMap<String,String>();
            for (String s : ts.variableNames) {
                valuesMap.put(s, (String) msgCtxt.getVariable(s));
            }
            StrSubstitutor sub = new StrSubstitutor(valuesMap);
            String resolvedString = sub.replace(ts.template);
            return resolvedString;
        }
        return spec;
    }
    
    private void execute0(MessageContext msgContext, ExecutionContext exeContext) throws Exception{
    	Operations operation = getOperation(msgContext);
    	switch (operation) {
		case Download:
			downloadFile(msgContext);
			break;
			
		case Upload:
			uploadFile(msgContext);
			break;
			
		case Exists:
			isFileExists(msgContext);
			break;
			
		}
    }
	/* (non-Javadoc)
	 * @see com.apigee.flow.execution.spi.Execution#execute(com.apigee.flow.message.MessageContext, com.apigee.flow.execution.ExecutionContext)
	 */
	@Override
	public ExecutionResult execute(MessageContext msgContext, ExecutionContext exeContext) {
		try{
			execute0(msgContext, exeContext);
		}catch(Exception e){
			if (getDebug()) {
                System.out.println(ExceptionUtils.getStackTrace(e));
            }
            String error = e.toString();
            msgContext.setVariable(varName("exception"), error);
            int ch = error.indexOf(":"); //error.lastIndexOf(':');
            
            if (ch >= 0) {
            	msgContext.setVariable(varName("error"), error.substring(ch+2).trim());
            	setErrorMessage("FileIOError", "NB_400", error, "FileIOError", "400", msgContext);
            }
            else {
            	msgContext.setVariable(varName("error"), error);
            	setErrorMessage("FileIOError", "NB_400", error, "FileIOError", "400", msgContext);
            }
            msgContext.setVariable(varName("stacktrace"), ExceptionUtils.getStackTrace(e));
            return ExecutionResult.ABORT;
		}
		
		return ExecutionResult.SUCCESS;
	}

}
