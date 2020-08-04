/**
 * 
 */
package com.ae;

import java.io.StringReader;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.stream.JsonGenerator;
import javax.json.stream.JsonParser;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.lang.text.StrSubstitutor;

// Apigee classes imports
import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;
import com.du.api.utill.TemplateString;


/**
 * 
 * @author mzuber
 *
 */

public class Encrypt implements Execution{

	/**
	 * @param args
	 */
	private static final String _varPrefix = "san_";
	private Map properties; // read-only
	private enum Operations {
        Encrypt,Decrypt;
    }
	
	public Encrypt (Map properties) {
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
	
	private Operations getOperation(MessageContext msgContext) throws Exception {
		String operation = getSimpleRequiredProperty("operation", msgContext);
		operation = operation.toLowerCase();
		switch (operation) {
		case "encrypt":
			return Operations.Encrypt;
		case "decrypt":
			return Operations.Decrypt;
		default:
			throw new IllegalStateException("operation value is unknown : (" + operation + ")");
		}
	}
	
	private String getOutputVar(MessageContext msgCtxt) throws Exception {
        return getSimpleRequiredProperty("output", msgCtxt);
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
	
    private String getSecretKey(MessageContext msgContext) throws Exception{
    	return getSimpleRequiredProperty("secret-key", msgContext);
    }
    
    private String getInput(MessageContext msgContext) throws Exception{
    	return getSimpleRequiredProperty("input", msgContext);
    }
    
    
    @SuppressWarnings("unused")
	public static String processJSON(String passphrase, String json, Operations operation) throws Exception{
    	JsonParser parser = Json.createParser(new StringReader(json));
    	
    	StringBuilder output = new StringBuilder();
//    	JsonGenerator generator = Json.createGenerator(output);
    	String str = null;
    	String keyName = null;
    	
    	while (parser.hasNext()) {
			JsonParser.Event event = parser.next();
			switch (event) {
			case START_OBJECT:
				
				output.append("{");
//				if(keyName != null)
//					generator.writeStartObject(keyName);
//				else
//					generator.writeStartObject();
				
				break;
			case KEY_NAME:
				keyName = parser.getString();
				output.append("\"" + keyName + "\" : ");
				
				
				break;
			case START_ARRAY:
//				if(keyName != null){
//					generator.writeStartArray(keyName);
//				}else{
//					generator.writeStartArray();
//				}
				output.append("[");
				break;
			//Close the array or object element of JSON	
			case END_ARRAY:
				output.deleteCharAt(output.length() - 1);
				output.append("],");
				break;
			case END_OBJECT:
//				generator.writeEnd();
				output.deleteCharAt(output.length() - 1);
				output.append("},");
				break;
				
			case VALUE_STRING:
//				if(keyName != null){
//					str = parser.getString();
//					if(operation == Operations.Encrypt){
//						str = encrypt(passphrase, str);
//					}else{
//						str = decrypt(passphrase, str);
//					}
//					generator.write(keyName, str);
//					
//				}
				str = parser.getString();
				if(operation == Operations.Encrypt){
					str = encrypt(passphrase, str);
				}else{
					str = decrypt(passphrase, str);
				}
				output.append("\"" +str + "\",");
				break;
			
			case VALUE_NUMBER:
//				if(keyName != null){
//					str = String.valueOf( parser.getInt() );
//					if(operation == Operations.Encrypt){
//						str = encrypt(passphrase, str);
//					}else{
//						str = decrypt(passphrase, str);
//					}
//					
//					generator.write(keyName, str);
//				}
				str = String.valueOf( parser.getInt() );
				if(operation == Operations.Encrypt){
					str = encrypt(passphrase, str);
				}else{
					str = decrypt(passphrase, str);
				}
				output.append("\"" + str + "\",");
				break;
			case VALUE_NULL:
//				if(keyName != null){
//					generator.write(keyName, "");
//				}
				output.append("null");
				break;
			default:
				break;
			}
		}
//    	generator.close();
//    	output.close();
    	if(output.length() > 0){
    		output.deleteCharAt(output.length() - 1);
    	}
    	System.out.println(output.toString());
    	
    	return output.toString();
    }
    
    
//===================================================================================

    public static String encrypt(String passphrase, String text)
    {
      if (passphrase == null) {
        throw new NullPointerException("passphrase is null");
      }
      if (text == null) {
        return null;
      }
      try
      {
        return new String(Base64.encodeBase64(alg(passphrase, text.getBytes(), 1)));
      }
      catch (Exception localException) {}
      return null;
    }
    
    public static String decrypt(String passphrase, String text)
    {
      if (passphrase == null) {
        throw new NullPointerException("passphrase is null");
      }
      if (text == null) {
        return null;
      }
      try
      {
        return new String(alg(passphrase, Base64.decodeBase64(text.getBytes()), 2));
      }
      catch (Exception localException) {}
      return null;
    }
    
    private static byte[] alg(String key, byte[] input, int cipherMode)
      throws Exception
    {
      byte[] output = null;
      SecretKeySpec keySpec = null;
      keySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(cipherMode, keySpec);
      output = cipher.doFinal(input);
      return output;
    }
    
//===================================================================================
	@Override
	public ExecutionResult execute(MessageContext msgContext, ExecutionContext exeContext) {
		
		try{
			String passphrase = getSecretKey(msgContext);
			Operations operation = getOperation(msgContext);
			String input = getInput(msgContext);
			String outputVar = getOutputVar(msgContext);
			String convertedJson = processJSON(passphrase, input, operation);
			msgContext.setVariable(outputVar, convertedJson);
			
		}catch(Exception e){
			if (getDebug()) {
                System.out.println(ExceptionUtils.getStackTrace(e));
            }
            String error = e.toString();
            msgContext.setVariable(varName("exception"), error);
            int ch = error.indexOf(":"); //error.lastIndexOf(':');
            
            if (ch >= 0) {
            	msgContext.setVariable(varName("error"), error.substring(ch+2).trim());
            	setErrorMessage("EncryptionError", "NB_4002", error, "EncryptionError", "400", msgContext);
            }
            else {
            	msgContext.setVariable(varName("error"), error);
            	setErrorMessage("EncryptionError", "NB_4002", error, "EncryptionError", "400", msgContext);
            }
            msgContext.setVariable(varName("stacktrace"), ExceptionUtils.getStackTrace(e));
            return ExecutionResult.ABORT;
		}
		
		return ExecutionResult.SUCCESS;
		
 		
	}
	
	public static void main(String args[]){
		String operation = "decrypt";
//		if(operation == null || operation == ""){
//			System.out.println("Please provide operation encrypt/decrypt");
//			return;
//		}
		
		String json = "{\"notificationType\":\"NJTL7KSnUv2BXxkiZtxMjg==\",\"mail\":\"s3H0qr+9DJ1U7JFgzAWyR/pPhO427JKa+VNDZrvZnys=\",\"msisdn\":\"NBnQkcOvCUuMpaGlragOMg==\"} ";
//		if(json == null || json == ""){
//			System.out.println("Empty JSON body");
//			return;
//		}
		
		String secret = "9876543210123456";
//		if(secret == null || secret  == ""){
//			System.out.println("Please give secret key");
//			return;
//		}
		String output = null;
		try{
			switch (operation) {
			case "encrypt":
				output = processJSON(secret, json, Operations.Encrypt);
				System.out.println("Encrypted JSON : ");
				System.out.println(output);
				return;
			case "decrypt":
				output = processJSON(secret, json, Operations.Decrypt);
				System.out.println("Decrypted JSON : ");
				System.out.println(output);
				return;
			default:
				System.out.println("Invalid Operation : " + operation);
				return;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
//		try{
//			String converted = "";
////			String converted = processJSON("1234567890123456", json, Operations.Encrypt);
////			System.out.println("Encrypted");
////			System.out.println(converted);
//			converted = processJSON("1234567890123456", json, Operations.Decrypt);
//			System.out.println("Decrypted");
//			System.out.println(converted);
//		}catch(Exception e){
//			e.printStackTrace();
//		}
		
	}
}
