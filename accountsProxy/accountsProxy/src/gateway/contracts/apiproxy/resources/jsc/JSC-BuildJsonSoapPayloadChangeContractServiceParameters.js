var inputJson = context.getVariable('request.content');
     var input = JSON.parse(inputJson);
    
    var soapPayload = {
	"soapenv:Envelope" : {
		"#namespaces":{
			"soapenv" : "http://schemas.xmlsoap.org/soap/envelope/",
			"web" : "http://www.webservices.com/LCE/Du/WebServices",
			"head" : "http://www.du.ae/LCE/Header",
			"lcew" : "http://xmlns.du.ae/LCE/Business/LCEWebServiceRequest" ,
			"chan" : "http://xmlns.du.ae/LCE/Business/ServiceManagement/ChangeContractServiceParameters"
		},
		"soapenv:Header":{},
		"soapenv:Body":{
			"web:ChangeContractServiceParameters":{
				"Request":{
					"head:Header":{
						"head:RequestId": context.getVariable("du.api.requestId"),
						"head:Credentials":{
							"head:ApplicationId": context.getVariable("du.config.applicationId"),
							"head:User": context.getVariable("du.config.mceUsername"),
							"head:Password": context.getVariable("du.config.mcePassword"),
						},
						"head:CorrelationId": "",
					},
					"lcew:Body": buildRequestBody(input),
				}
			}
		}
	}
};

context.setVariable("request.content", JSON.stringify(soapPayload));
     
function buildRequestBody(input){
	return {
		"chan:COM" :{
			"chan:DOCUMENT" : {
				"chan:DOCUMENT_ID": input.COM.DOCUMENT.DOCUMENT_ID,
				"chan:DOCUMENT_DATE": input.COM.DOCUMENT.DOCUMENT_DATE,
				"chan:DOCUMENT_NUMBER": input.COM.DOCUMENT.DOCUMENT_NUMBER,
				"chan:DOCUMENT_TYPE": input.COM.DOCUMENT.DOCUMENT_TYPE,
				"chan:DOCUMENT_STATUS": input.COM.DOCUMENT.DOCUMENT_STATUS,
				"chan:DOCUMENT_ACTION": input.COM.DOCUMENT.DOCUMENT_ACTION,
				"chan:SEGMENT": input.COM.DOCUMENT.SEGMENT,
				"chan:DOCUMENT_CLOSURE_DATE": input.COM.DOCUMENT.DOCUMENT_CLOSURE_DATE,
				"chan:DOCUMENT_CREATED_DATE": input.COM.DOCUMENT.DOCUMENT_CREATED_DATE,
				"chan:CUSTOMER" : getCustomerArray(input.COM.DOCUMENT.CUSTOMER),
				"chan:EXTRA_PARAMETERS" : getExtraParametersArray(input.COM.DOCUMENT.EXTRA_PARAMETERS),				
			}
		}
	}
}

function getCustomerArray(customers){
	var custArray = [];
	if(customers){
		for (var i = 0; i < customers.length; i++) {
			custArray.push({
				"chan:CORRELATION" : getCorrelationObject(customers[i].CORRELATION),
				"chan:CUSTOMER_ID": customers[i].CUSTOMER_ID,
				"chan:CUSTOMER_ID_PUB": customers[i].CUSTOMER_ID_PUB,
				"chan:CUSTOMER_PARENT": customers[i].CUSTOMER_PARENT,
				"chan:CUSTOMER_CODE": customers[i].CUSTOMER_CODE,
				"chan:CUSTOMER_LEVEL": customers[i].CUSTOMER_LEVEL,
				"chan:ACTIVITY" : getActivityArray(customers[i].ACTIVITY),
				"chan:NAME": customers[i].NAME,
				"chan:TYPE": customers[i].TYPE,
				"chan:CUSTOMER_SEGMENT": customers[i].CUSTOMER_SEGMENT,
				"chan:INDUSTRY": customers[i].INDUSTRY,
				"chan:WEB_ADDRESS": customers[i].WEB_ADDRESS,
				"chan:NUMBER_OF_EMPLOYEES": customers[i].NUMBER_OF_EMPLOYEES,
				"chan:NATURE_OF_BUSINESS": customers[i].NATURE_OF_BUSINESS,
				"chan:PAYMENT_RESPONSIBLE_FLAG": customers[i].PAYMENT_RESPONSIBLE_FLAG,
				"chan:CONTRACT_RESPONSIBLE_FLAG": customers[i].CONTRACT_RESPONSIBLE_FLAG,
				"chan:VOICE_LANGUAGE_ID": customers[i].VOICE_LANGUAGE_ID,
				"chan:PASSWORD": customers[i].PASSWORD,
				"chan:ACTIVATION_DATE": customers[i].ACTIVATION_DATE,
				"chan:VISA_NUMBER": customers[i].VISA_NUMBER,
				"chan:VISA_TYPE": customers[i].VISA_TYPE,
				"chan:HOLDER_PARENT_ENTERPRISE_NAME": customers[i].HOLDER_PARENT_ENTERPRISE_NAME,
				"chan:HOLDER_REGISTRATION_DATE": customers[i].HOLDER_REGISTRATION_DATE,
				"chan:HOLDER_PHONE_NUMBER": customers[i].HOLDER_PHONE_NUMBER,
				"chan:HOLDER_ORGANIZATION_TYPE": customers[i].HOLDER_ORGANIZATION_TYPE,
				"chan:PERSON_TO_CONTACT": customers[i].PERSON_TO_CONTACT,
				"chan:PHONE_NUMBER": customers[i].PHONE_NUMBER,
				"chan:FAX_NUMBER": customers[i].FAX_NUMBER,
				"chan:EMAIL_ADDRESS": customers[i].EMAIL_ADDRESS,
				"chan:SALES_CHANNEL": customers[i].SALES_CHANNEL,
				"chan:SALES_MARKET": customers[i].SALES_MARKET,
				"chan:SALES_OUTLET": customers[i].SALES_OUTLET,
				"chan:SALES_AGENT": customers[i].SALES_AGENT,
				"chan:SALES_AGENT_LOCATION": customers[i].SALES_AGENT_LOCATION,
				"chan:REGISTRATION_CERTIFICATE_FLAG": customers[i].REGISTRATION_CERTIFICATE_FLAG,
				"chan:CONTRACT_FORM_FLAG": customers[i].CONTRACT_FORM_FLAG,
				"chan:DIRECT_DEBIT_FORM_FLAG": customers[i].DIRECT_DEBIT_FORM_FLAG,
				"chan:LETTER_AUTHORITHY_FLAG": customers[i].LETTER_AUTHORITHY_FLAG,
				"chan:CREDIT_FORM_FLAG": customers[i].CREDIT_FORM_FLAG,
				"chan:PASSPORT_COPY_FLAG": customers[i].PASSPORT_COPY_FLAG,
				"chan:ANNUAL_SALES": customers[i].ANNUAL_SALES,
				"chan:DEBIT_LEVEL": customers[i].DEBIT_LEVEL,
				"chan:NET_WORTH": customers[i].NET_WORTH,
				"chan:ANNUAL_PROFIT": customers[i].ANNUAL_PROFIT,
				"chan:INITIAL_CUSTOMER_STATUS": customers[i].INITIAL_CUSTOMER_STATUS,
				"chan:CUSTOMER_STATUS": customers[i].CUSTOMER_STATUS,
				"chan:STATUS_REASON": customers[i].STATUS_REASON,
				"chan:PREFERRED_BILL_ACCOUNT": customers[i].PREFERRED_BILL_ACCOUNT,
				"chan:MONTHLY_CUSTOMER_INCOME": customers[i].MONTHLY_CUSTOMER_INCOME,
				"chan:SUPPRESS_MARKETING_CALLS_FLAG": customers[i].SUPPRESS_MARKETING_CALLS_FLAG,
				"chan:IDENTIFICATION_DOCUMENT" : getIdentificationDocumentArray(customers[i].IDENTIFICATION_DOCUMENT),
				"chan:CREATION_DATE": customers[i].CREATION_DATE,
				"chan:STATUS_DATE": customers[i].STATUS_DATE,
				"chan:TERMS": customers[i].TERMS,
				"chan:COST_CENTER": customers[i].COST_CENTER,
				"chan:INVOICE_LANGUAGE": customers[i].INVOICE_LANGUAGE,
				"chan:ITEMIZED_INVOICE": customers[i].ITEMIZED_INVOICE,
				"chan:BANK_GUARANTEE_AMOUNT": customers[i].BANK_GUARANTEE_AMOUNT,
				"chan:MANUAL_MANAGEMENT_FLAG": customers[i].MANUAL_MANAGEMENT_FLAG,
				"chan:BLACKLIST_FLAG": customers[i].BLACKLIST_FLAG,
				"chan:DEPOSIT_AMOUNT": customers[i].DEPOSIT_AMOUNT,
				"chan:DEPOSIT_CURRENCY": customers[i].DEPOSIT_CURRENCY,
				"chan:CREDIT_LIMIT": customers[i].CREDIT_LIMIT,
				"chan:CREDIT_LIMIT_CURRENCY": customers[i].CREDIT_LIMIT_CURRENCY,
				"chan:CREDIT_THRESHOLD_1": customers[i].CREDIT_THRESHOLD_1,
				"chan:CREDIT_THRESHOLD_2": customers[i].CREDIT_THRESHOLD_2,
				"chan:CREDIT_THRESHOLD_3": customers[i].CREDIT_THRESHOLD_3,
				"chan:TAX_EXEMPT": customers[i].TAX_EXEMPT,
				"chan:BILL_CYCLE": customers[i].BILL_CYCLE,
				"chan:BILL_DELIVERY_METHOD": customers[i].BILL_DELIVERY_METHOD,
				"chan:RATE_PLAN": customers[i].RATE_PLAN,
				"chan:PREPAYMENT_REQUIRED_FLAG": customers[i].PREPAYMENT_REQUIRED_FLAG,
				"chan:COPIES": customers[i].COPIES,
				"chan:CUSTOMER_CATEGORY": customers[i].CUSTOMER_CATEGORY,
				"chan:EXPECTED_PAYMENT_CURRENCY": customers[i].EXPECTED_PAYMENT_CURRENCY,
				"chan:EXTERNAL_CUSTOMER_ID": customers[i].EXTERNAL_CUSTOMER_ID,
				"chan:EXTERNAL_CUSTOMER_SET_ID": customers[i].EXTERNAL_CUSTOMER_SET_ID,
				"chan:FAMILY_ID": customers[i].FAMILY_ID,
				"chan:DEALER_ID": customers[i].DEALER_ID,
				"chan:LEGACY_ID": customers[i].LEGACY_ID,
				"chan:CASH_COLLECTOR": customers[i].CASH_COLLECTOR,
				"chan:PAYMENT_CONVERSION_RATETYPE": customers[i].PAYMENT_CONVERSION_RATETYPE,
				"chan:REFUND_CONVERSION_RATETYPE": customers[i].REFUND_CONVERSION_RATETYPE,
				"chan:EXTERNAL_CREDIT_CHECK_FLAG": customers[i].EXTERNAL_CREDIT_CHECK_FLAG,
				"chan:BILL_INFORMATION_FLAG": customers[i].BILL_INFORMATION_FLAG,
				"chan:DUNNING_FLAG": customers[i].DUNNING_FLAG,
				"chan:LEVY_TAXES_CITY_AREA_FLAG": customers[i].LEVY_TAXES_CITY_AREA_FLAG,
				"chan:TAX_JURISDICTION": customers[i].TAX_JURISDICTION,
				"chan:SUBSCRIPTION_REDUCTION": customers[i].SUBSCRIPTION_REDUCTION,
				"chan:RESSELER_FLAG": customers[i].RESSELER_FLAG,
				"chan:BUSINESS_PARTNER_FLAG": customers[i].BUSINESS_PARTNER_FLAG,
				"chan:REFUND_CURRENCY": customers[i].REFUND_CURRENCY,
				"chan:TREATMENT_SEGMENT": customers[i].TREATMENT_SEGMENT,
				"chan:MODIFY_TREATMENT_SEGMENT": customers[i].MODIFY_TREATMENT_SEGMENT,
				"chan:RECURRING_PAYMENT": customers[i].RECURRING_PAYMENT,
				"chan:USERNAME": customers[i].USERNAME,
				"chan:PAYMENT_ARRANGEMENT" : getPaymentArrangementArray(customers[i].PAYMENT_ARRANGEMENT),
				"chan:ACCOUNT_MANAGER" : getAccountManagerArray(customers[i].ACCOUNT_MANAGER),
				"chan:CONTRACT" : getContractArray(customers[i].CONTRACT),
				"chan:CONTACT" : getContactArray(customers[i].CONTACT),
				"chan:EXTENDED_INFO_LIST" : getExtendedInfoList(customers[i].EXTENDED_INFO_LIST),
				"chan:BILLING_ACCOUNT" : getBillingAccountArray(customers[i].BILLING_ACCOUNT),
			});
		}
	}
	return custArray;
}


function getExtendedInfoList(infoList) {
	if(infoList){
		return {
					"chan:EXTENDED_INFO" : getExtendedInfoArray(customers[i].EXTENDED_INFO_LIST),
				}
	}else{

		return null;
	}

}

function getCorrelationObject(correlation){
	var corObj = {};
	if(correlation){
		corObj = {
			"chan:CORRELATION_ID": correlation.CORRELATION_ID,
			"chan:CORRELATION_DATE": correlation.CORRELATION_DATE,
			"chan:CORRELATION_NUMBER": correlation.CORRELATION_NUMBER,
			"chan:CORRELATION_TYPE": correlation.CORRELATION_TYPE,
			"chan:STATUS": correlation.STATUS,
			"chan:DESCRIPTION": correlation.DESCRIPTION
		}
	}
	return corObj;
}

function getExtraParametersArray(extraParams){
	var extraParamsArray = [];
	if(extraParams){
		for (var i = 0; i < extraParams.length; i++) {
			extraParamsArray.push({
				"chan:NAME": extraParams[i].NAME,
				"chan:VALUE": extraParams[i].VALUE
			});
		}
	}
	return extraParamsArray;
}

function getActivityArray(activities){
	var actArray = [];
	if(activities){
		for (var i = 0; i < activities.length; i++) {
			actArray.push({
				"chan:ACTIVITY_ID": activities[i].ACTIVITY_ID,
				"chan:TYPE": activities[i].TYPE,
				"chan:DESCRIPTION": activities[i].DESCRIPTION,
				"chan:STATUS": activities[i].STATUS
			})
		}
	}
	return actArray;
}

function getIdentificationDocumentArray(idDocs){
	var idDocsArray = [];
	if(idDocs){
		for (var i = 0; i < idDocs.length; i++) {
			idDocsArray.push({
				"chan:DOCUMENT_TYPE": idDocs[i].DOCUMENT_TYPE,
				"chan:DOCUMENT_NUMBER": idDocs[i].DOCUMENT_NUMBER,
				"chan:EXPIRE_DATE": idDocs[i].EXPIRE_DATE,
				"chan:PLACE_OF_ISSUE": idDocs[i].PLACE_OF_ISSUE
			});
		}
	}
	return idDocsArray;
}

function getPaymentArrangementArray(payments){
	var paymentsArray = [];
	if(payments){
		for (var i = 0; i < payments.length; i++) {
			paymentsArray.push({
				"chan:PAYMENT_METHOD": payments[i].PAYMENT_METHOD,
				"chan:CURRENT_PAYMENT_FLAG": payments[i].CURRENT_PAYMENT_FLAG,
				"chan:DIRECT_DEBIT_LIMIT_CURRENCY": payments[i].DIRECT_DEBIT_LIMIT_CURRENCY,
				"chan:DIRECT_DEBIT_LIMIT_AMOUNT": payments[i].DIRECT_DEBIT_LIMIT_AMOUNT,
				"chan:ACCOUNT_NUMBER": payments[i].ACCOUNT_NUMBER,
				"chan:ACCOUNT_OWNER": payments[i].ACCOUNT_OWNER,
				"chan:BANK_CODE": payments[i].BANK_CODE,
				"chan:BANK_NAME": payments[i].BANK_NAME,
				"chan:BANK_BRANCH": payments[i].BANK_BRANCH,
				"chan:BANK_ACCOUNT_NUMBER": payments[i].BANK_ACCOUNT_NUMBER,
				"chan:CREDIT_CARD_COMPANY": payments[i].CREDIT_CARD_COMPANY,
				"chan:SWIFT_CODE": payments[i].SWIFT_CODE,
				"chan:CREDIT_CARD_NUMBER": payments[i].CREDIT_CARD_NUMBER,
				"chan:VALID_DATE": payments[i].VALID_DATE,
				"chan:CVV": payments[i].CVV
			})
		}
	}
	return paymentsArray;
}

function getAccountManagerArray(accounts){
	var accountsArray = [];
	if(accounts){
		for (var i = 0; i < accounts.length; i++) {
			accountsArray.push({
				"chan:ACCOUNT_MANAGER_NAME": accounts[i].ACCOUNT_MANAGER_NAME,
				"chan:PHONE_NUMBER": accounts[i].PHONE_NUMBER
			})
		}
	}
	return accountsArray;
}

function getContractArray(contracts){
	var contractsArray = [];
	if(contracts){
		for (var i = 0; i < contracts.length; i++) {
			contractsArray.push({
				"chan:CORRELATION": getCorrelationObject(contracts[i].CORRELATION),
				"chan:CONTRACT_ID": context.getVariable("contractId"),
				"chan:CONTRACT_ID_PUB": contracts[i].CONTRACT_ID_PUB,
				"chan:SIGNED_DATE": contracts[i].SIGNED_DATE,
				"chan:ACTIVATION_DATE": contracts[i].ACTIVATION_DATE,
				"chan:CONTRACT_STATUS": contracts[i].CONTRACT_STATUS,
				"chan:STATUS_DATE": contracts[i].STATUS_DATE,
				"chan:REASON_FOR_STATUS": contracts[i].REASON_FOR_STATUS,
				"chan:DEACTIVATION_DATE": contracts[i].DEACTIVATION_DATE,
				"chan:RATE_PLAN_CODE": contracts[i].RATE_PLAN_CODE,
				"chan:RATE_PLAN_DESCRIPTION": contracts[i].RATE_PLAN_DESCRIPTION,
				"chan:CONTRACT_CURRENCY": contracts[i].CONTRACT_CURRENCY,
				"chan:ALLOW_FREE_UNITS_CARRY_OVER": contracts[i].ALLOW_FREE_UNITS_CARRY_OVER,
				"chan:MARKET_CODE": contracts[i].MARKET_CODE,
				"chan:SUB_MARKET_CODE": contracts[i].SUB_MARKET_CODE,
				"chan:NETWORK_CODE": contracts[i].NETWORK_CODE,
				"chan:ALTERNATIVE_RATE_PLAN_CODE": contracts[i].ALTERNATIVE_RATE_PLAN_CODE,
				"chan:VALID_FROM_DATE": contracts[i].VALID_FROM_DATE,
				"chan:DEALER_ID": contracts[i].DEALER_ID,
				"chan:SALES_PERSON": contracts[i].SALES_PERSON,
				"chan:DEALER_SALES_ADVISOR_ID": contracts[i].DEALER_SALES_ADVISOR_ID,
				"chan:CUSTOMER_SERVICE_LANGUAGE": contracts[i].CUSTOMER_SERVICE_LANGUAGE,
				"chan:VIP_FLAG": contracts[i].VIP_FLAG,
				"chan:CAMPAIGN_CODE": contracts[i].CAMPAIGN_CODE,
				"chan:USE_GLOBAL_TAP_RATE_PLAN_FOR_ROAMING": contracts[i].USE_GLOBAL_TAP_RATE_PLAN_FOR_ROAMING,
				"chan:LIST_IN_OPERATOR_DIRECTORY": contracts[i].LIST_IN_OPERATOR_DIRECTORY,
				"chan:LIST_IN_PUBLIC_DIRECTORY": contracts[i].LIST_IN_PUBLIC_DIRECTORY,
				"chan:LOCAL_EXCHANGE_CARRIER": contracts[i].LOCAL_EXCHANGE_CARRIER,
				"chan:CREATE_REQUEST_DEPOSIT": contracts[i].CREATE_REQUEST_DEPOSIT,
				"chan:IS_PREPAID": contracts[i].IS_PREPAID,
				"chan:MAIN_SUBSCRIBER_CONTRACT": contracts[i].MAIN_SUBSCRIBER_CONTRACT,
				"chan:NUMERIC_PASSWORD": contracts[i].NUMERIC_PASSWORD,
				"chan:AUTHORIZED_PERSON": contracts[i].AUTHORIZED_PERSON,
				"chan:WITH_HOLD_DIRECTORY_LISTING": contracts[i].WITH_HOLD_DIRECTORY_LISTING,
				"chan:ACCOUNT_OWNER": contracts[i].ACCOUNT_OWNER,
				"chan:ACCOUNT_OWNER_IS_USER_OF_NEW_LINE": contracts[i].ACCOUNT_OWNER_IS_USER_OF_NEW_LINE,
				"chan:CAMPAIGN_ID": contracts[i].CAMPAIGN_ID,
				"chan:DIRECT_MARKETING_BY_DU": contracts[i].DIRECT_MARKETING_BY_DU,
				"chan:ARCHIVE_CALLS_FLAG": contracts[i].ARCHIVE_CALLS_FLAG,
				"chan:PAYMENT_CONDITION_FOR_IMPLICIT_SERVICES": contracts[i].PAYMENT_CONDITION_FOR_IMPLICIT_SERVICES,
				"chan:DN_RETENTION_MODE": contracts[i].DN_RETENTION_MODE,
				"chan:CONTACT" : getContactArray(contracts[i].CONTACT),
				"chan:SIM" : getSimArrayOfContract(contracts[i].SIM),
				"chan:SERVICE" : getSerivcesArray(contracts[i].SERVICE),
				"chan:BILLING_ACCOUNT" : getBillingAccountArray(contracts[i].BILLING_ACCOUNT),
				"chan:RELATION" : getRelationArrayOfContract(contracts[i].RELATION),
			});	
		}
		
	}
	
	return contractsArray;
}

function getRelationArrayOfContract(relations){
	var relArray = [];
	if(relations){
		for (var i = 0; i < relations.length; i++) {
			relArray.push({
				"chan:RELATION_ACTION": relations[i].RELATION_ACTION,
				"chan:RELATION_TYPE": relations[i].RELATION_TYPE,
				"chan:RELATION_CODE": relations[i].RELATION_CODE,
				"chan:RELATION_DESCRIPTION": relations[i].RELATION_DESCRIPTION,
				"chan:RELATION_CREATION_DATE": relations[i].RELATION_CREATION_DATE,
				"chan:RELATION_PRIMARY_PARTICIPANT_FLAG": relations[i].RELATION_PRIMARY_PARTICIPANT_FLAG,
				"chan:RELATION_START_DATE": relations[i].RELATION_START_DATE,
				"chan:RELATION_END_DATE": relations[i].RELATION_END_DATE,
				"chan:RELATE_TO" : getRelationToArray(relations[i].RELATE_TO),
				"chan:RELATE_FROM" : getRelationFromArray(relations[i].RELATE_FROM),
			});
		}
	}
	return relArray;
}

function getRelationToArray(relTo){
	var relToArray = [];
	if(relTo){
		for (var i = 0; i < relTo.length; i++) {
			relToArray.push({
				"chan:RELATE_TO_ID": relTo[i].RELATE_TO_ID,
				"chan:VALID_FROM_DATE": relTo[i].VALID_FROM_DATE,
				"chan:VALID_TO_DATE": relTo[i].VALID_TO_DATE,
				"chan:ADDITIONAL_INFORMATION": getAdditionInformationArray(relTo[i].ADDITIONAL_INFORMATION),
			});
		}
	}
	return relToArray;
}

function getRelationFromArray(relFrom){
	var relFromArray = [];
	if(relFrom){
		for (var i = 0; i < relFrom.length; i++) {
			relFromArray.push({
				"chan:RELATE_FROM_ID": relFrom[i].RELATE_FROM_ID,
				"chan:VALID_FROM_DATE": relFrom[i].VALID_FROM_DATE,
				"chan:VALID_TO_DATE": relFrom[i].VALID_TO_DATE,
				"chan:ADDITIONAL_INFORMATION": getAdditionInformationArray(relFrom[i].ADDITIONAL_INFORMATION),
			})
		}
	}
	return relFromArray;
}

function getAdditionInformationArray(addInfo){
	var addInfoArray = [];
	if(addInfo){
		for (var i = 0; i < addInfo.length; i++) {
			addInfoArray.push({
				"chan:NAME": addInfo[i].NAME,
				"chan:VALUE": addInfo[i].VALUE
			});
		}
	}
	return addInfoArray;
}

function getSerivcesArray(services){
	var servicesArray = [];
	if(services){
		for (var i = 0; i < services.length; i++) {
			servicesArray.push({
				"chan:CORRELATION": getCorrelationObject(services[i].CORRELATION),
				"chan:SERVICE_ID": services[i].SERVICE_ID,
				"chan:DESCRIPTION": services[i].DESCRIPTION,
				"chan:ACTIVATION_DATE": services[i].ACTIVATION_DATE,
				"chan:DEACTIVATION_DATE": services[i].DEACTIVATION_DATE,
				"chan:ACCESS_FEE": services[i].ACCESS_FEE,
				"chan:SUBSCRIPTION_FEE": services[i].SUBSCRIPTION_FEE,
				"chan:SERVICE_PACKAGE_CODE": services[i].SERVICE_PACKAGE_CODE,
				"chan:SERVICE_DESCRIPTION": services[i].SERVICE_DESCRIPTION,
				"chan:PROFILE_ID": services[i].PROFILE_ID,
				"chan:PARAMETER_CONFIGURATION_REQUIRED": services[i].PARAMETER_CONFIGURATION_REQUIRED,
				"chan:RESOURCE_CONFIGURATION_REQUIRED": services[i].RESOURCE_CONFIGURATION_REQUIRED,
				"chan:EXTERNAL_SERVICE_ID": services[i].EXTERNAL_SERVICE_ID,
				"chan:OPERATOR_ASSISTED_ACTION": services[i].OPERATOR_ASSISTED_ACTION,
				"chan:TEMPLATE_ID": services[i].TEMPLATE_ID,
				"chan:ONE_TIME_CHARGE": services[i].ONE_TIME_CHARGE,
				"chan:ONE_TIME_CHARGE_TYPE": services[i].ONE_TIME_CHARGE_TYPE,
				"chan:RECURRING_CHARGE": services[i].RECURRING_CHARGE,
				"chan:RECURRING_CHARGE_TYPE": services[i].RECURRING_CHARGE_TYPE,
				"chan:RECURRING_CHARGE_PERIOD": services[i].RECURRING_CHARGE_PERIOD,
				"chan:ADVANCED_RECURRING_CHARGE": services[i].ADVANCED_RECURRING_CHARGE,
				"chan:ADVANCED_RECURRING_CHARGE_TYPE": services[i].ADVANCED_RECURRING_CHARGE_TYPE,
				"chan:ADVANCED_RECURRING_CHARGE_PERIOD": services[i].ADVANCED_RECURRING_CHARGE_PERIOD,
				"chan:SERVICE_TRIAL_END_DATE": services[i].SERVICE_TRIAL_END_DATE,
				"chan:CUG_ACTION": services[i].CUG_ACTION,
				"chan:CUSTOMER_PAYMENT_CONDITION_USAGE_INDICATOR": services[i].CUSTOMER_PAYMENT_CONDITION_USAGE_INDICATOR,
				"chan:SERVICE_QUANTITY": services[i].SERVICE_QUANTITY,
				"chan:CUSTOMER_PREPAID_TP_ID": services[i].CUSTOMER_PREPAID_TP_ID,
				"chan:SERVICE_STATUS": services[i].SERVICE_STATUS,
				"chan:SERVICE_STATUS_DATE": services[i].SERVICE_STATUS_DATE,
				"chan:LOCATION_A_SERVICE_INSTALATION_DATE": services[i].LOCATION_A_SERVICE_INSTALATION_DATE,
				"chan:LOCATION_B_SERVICE_INSTALATION_DATE": services[i].LOCATION_B_SERVICE_INSTALATION_DATE,
				"chan:SERVICE_PROVISIONING_DATE": services[i].SERVICE_PROVISIONING_DATE,
				"chan:RESOURCE" : getResourcesArrayOfService(services[i].RESOURCE),
				"chan:PARAMETER" : getParametersArrayOfService(services[i].PARAMETER),
				"chan:CUG_MEMBERSHIP" : getCugMembershipArrayOfService(services[i].CUG_MEMBERSHIP),
				"chan:BSG_CONFIGURATION" : getBsgConfigArrayOfService(services[i].BSG_CONFIGURATION),
			});
		}
	}
	return servicesArray;
}

function getBsgConfigArrayOfService(BsgConfigs){
	var BsgConfigsArray = [];
	if(BsgConfigs){
		for (var i = 0; i < BsgConfigs.length; i++) {
			BsgConfigsArray.push({
				"chan:BSG_ID": BsgConfigs[i].BSG_ID,
				"chan:PREFERED_CUG_ID": BsgConfigs[i].PREFERED_CUG_ID
			});
		}
	}
	return BsgConfigsArray;
}
function getCugMembershipArrayOfService(cugMembers){
	var cugMembersArray = [];
	if(cugMembers){
		for (var i = 0; i < cugMembers.length; i++) {
			cugMembersArray.push({
				"chan:CUG_ID": cugMembers[i].CUG_ID,
				"chan:BASIC_SERVICE_GROUP_ASSIGNMENT": getBasicServiceGroupAssignmentArray(cugMembers[i].BASIC_SERVICE_GROUP_ASSIGNMENT),
			});
		}
	}
	return cugMembersArray;
}

function getBasicServiceGroupAssignmentArray(BSGAssignments){
	var BSGAssignmentsArray = [];
	if(BSGAssignments){
		for (var i = 0; i < BSGAssignments.length; i++) {
			BSGAssignmentsArray.push({
				"chan:BSG_ID": BSGAssignments[i].BSG_ID,
				"chan:BSG_ACTION": BSGAssignments[i].BSG_ACTION
			});
		}
	}
	return BSGAssignmentsArray;
}
function getParametersArrayOfService(parameters){
	var parametersArray = [];
	if(parameters){
		for (var i = 0; i < parameters.length; i++) {
			parametersArray.push({
				"chan:NAME": parameters[i].NAME,
				"chan:NUMBER": parameters[i].NUMBER,
				"chan:TYPE": parameters[i].TYPE,
				"chan:ACTION": parameters[i].ACTION,
				"chan:VALUE" : getValueArrayOfParameters(parameters[i].VALUE)
			});
		}
	}
	return parametersArray;
}

function getValueArrayOfParameters(values){
	var valuesArray = [];
	if(values){
		for (var i = 0; i < values.length; i++) {
			valuesArray.push({
				"chan:VALUE": values[i].VALUE,
				"chan:DESCRIPTION": values[i].DESCRIPTION,
				"chan:SEQUENCE_NUMBER": values[i].SEQUENCE_NUMBER,
				"chan:VALID_FROM": values[i].VALID_FROM
			});
		}
	}
	return valuesArray;
}

function getResourcesArrayOfService(resources){
	var resourcesArray = [];
	if(resources){
		for (var i = 0; i < resources.length; i++) {
			resourcesArray.push({
				"chan:MSISDN" : getMSISDNArray(resources[i].MSISDN),
				"chan:PORT" : getPortArray(resources[i].PORT),
			})
		}
	}
	return resourcesArray;
}

function getPortArray(ports){
	var portsArray = [];
	if(ports){
		for (var i = 0; i < ports.length; i++) {
			portsArray.push({
				"chan:EXT_RESOURCE_TYPE_CODE": ports[i].EXT_RESOURCE_TYPE_CODE,
				"chan:PORT_ID": ports[i].PORT_ID,
				"chan:PORT_NUM": ports[i].PORT_NUM,
				"chan:RETENTION": ports[i].RETENTION,
				"chan:STATUS": ports[i].STATUS,
				"chan:NUMBERING_PLAN_CODE": ports[i].NUMBERING_PLAN_CODE
			});
		}
	}
	return portsArray;
}

function getMSISDNArray(msisdns){
	var msisdnsArray = [];
	if(msisdns){
		for (var i = 0; i < msisdns.length; i++) {
			msisdnsArray.push({
				"chan:MSISDN_ID": msisdns[i].MSISDN_ID,
				"chan:MSISDN_NUMBER": msisdns[i].MSISDN_NUMBER,
				"chan:PATTERN": msisdns[i].PATTERN,
				"chan:STATUS": msisdns[i].STATUS,
				"chan:DEACTIVATION_DATE": msisdns[i].DEACTIVATION_DATE,
				"chan:TYPE": msisdns[i].TYPE,
				"chan:NUMBERING_PLAN_CODE": msisdns[i].NUMBERING_PLAN_CODE,
				"chan:NETWORK_CODE": msisdns[i].NETWORK_CODE,
				"chan:RETENTION_MODE": msisdns[i].RETENTION_MODE,
				"chan:TIME_TO_LOCK": msisdns[i].TIME_TO_LOCK,
				"chan:PASSWORD": msisdns[i].PASSWORD,
				"chan:LANGUAGE": msisdns[i].LANGUAGE,
				"chan:LOGICAL_HLR_CODE": msisdns[i].LOGICAL_HLR_CODE,
				"chan:PHYSICAL_HLR_CODE": msisdns[i].PHYSICAL_HLR_CODE,
				"chan:MAIN_NUMBER_FLAG": msisdns[i].MAIN_NUMBER_FLAG,
				"chan:VANITY_NUMBER_FLAG": msisdns[i].VANITY_NUMBER_FLAG,
				"chan:NUMBER_ON_BILL": msisdns[i].NUMBER_ON_BILL,
				"chan:UPPER_EXTENSION": msisdns[i].UPPER_EXTENSION,
				"chan:LOWER_EXTENSION": msisdns[i].LOWER_EXTENSION,
				"chan:PREFIX": msisdns[i].PREFIX,
				"chan:SUB_MARKET_ID": msisdns[i].SUB_MARKET_ID,
				"chan:RESERVATION" : getReservationObject(msisdns[i].RESERVATION),
			});
		}
	}
	return msisdnsArray;
}

function getReservationObject(reservation){
	var reservationObj = {};
	if(reservation){
		reservationObj = {
			"chan:BOOKING_NUMBER": reservation.BOOKING_NUMBER,
			"chan:FIRST_NAME": reservation.FIRST_NAME,
			"chan:LAST_NAME": reservation.LAST_NAME
		}
	}
	return reservationObj;
}

function getSimArrayOfContract(sims){
	var simsArray = [];
	if(sims){
		for (var i = 0; i < sims.length; i++) {
			simsArray.push({
				"chan:SIM_NUMBER": sims[i].SIM_NUMBER,
				"chan:SIM_NUMBER_ID": sims[i].SIM_NUMBER_ID,
				"chan:STATUS": sims[i].STATUS,
				"chan:NUMBERING_PLAN": sims[i].NUMBERING_PLAN,
				"chan:IMSI": sims[i].IMSI,
				"chan:TYPE": sims[i].TYPE,
				"chan:REASON_CODE": sims[i].REASON_CODE,
				"chan:RETENTION_MODE": sims[i].RETENTION_MODE,
				"chan:DEALER": sims[i].DEALER,
				"chan:PRIMARY": sims[i].PRIMARY,
				"chan:PIN": sims[i].PIN,
				"chan:PIN2": sims[i].PIN2,
				"chan:PUK": sims[i].PUK,
				"chan:PUK2": sims[i].PUK2,
				"chan:LAST_MODIFICATION_DATE": sims[i].LAST_MODIFICATION_DATE,
				"chan:RES_ID": sims[i].RES_ID,
				"chan:RES_TYPE": sims[i].RES_TYPE
			});
		}
	}
	return simsArray;
}

function getContactArray(contacts){
	var contactsArray = [];
	if(contacts){
		for (var i = 0; i < contacts.length; i++) {
			contactsArray.push({
				"chan:FIRST_NAME": contacts[i].FIRST_NAME,
				"chan:MIDDLE_NAME_1": contacts[i].MIDDLE_NAME_1,
				"chan:MIDDLE_NAME_2": contacts[i].MIDDLE_NAME_2,
				"chan:FAMILY_NAME": contacts[i].FAMILY_NAME,
				"chan:TITLE": contacts[i].TITLE,
				"chan:BIRTH_DATE": contacts[i].BIRTH_DATE,
				"chan:NATIONALITY": contacts[i].NATIONALITY,
				"chan:GENDER": contacts[i].GENDER,
				"chan:MARITAL_STATUS": contacts[i].MARITAL_STATUS,
				"chan:COMPANY_NAME": contacts[i].COMPANY_NAME,
				"chan:COMPANY_REGISTRATION_NUMBER": contacts[i].COMPANY_REGISTRATION_NUMBER,
				"chan:JOB_DESCRIPTION": contacts[i].JOB_DESCRIPTION,
				"chan:DEPARTMENT": contacts[i].DEPARTMENT,
				"chan:HOME_PHONE": contacts[i].HOME_PHONE,
				"chan:WORK_PHONE": contacts[i].WORK_PHONE,
				"chan:CELLULAR_PHONE": contacts[i].CELLULAR_PHONE,
				"chan:FAX_PHONE": contacts[i].FAX_PHONE,
				"chan:EMAIL_ADDRESS": contacts[i].EMAIL_ADDRESS,
				"chan:EMAIL_ADDRESS_2": contacts[i].EMAIL_ADDRESS_2,
				"chan:LANGUAGE": contacts[i].LANGUAGE,
				"chan:PASSPORT_ID": contacts[i].PASSPORT_ID,
				"chan:SMS_NUMBER": contacts[i].SMS_NUMBER,
				"chan:ADDRESS" : getAddressArray(contacts[i].ADDRESS),
			});
		}
	}
	return contactsArray;
}

function getExtendedInfoArray(extdInfos){
	var extdInfosArray = [];
	if(extdInfos){
		for (var i = 0; i < extdInfos.length; i++) {
			extdInfosArray.push({
				"chan:INFO_NAME": extdInfos[i].INFO_NAME,
				"chan:INFO_VALUE": extdInfos[i].INFO_VALUE
			})
		}
	}
	return extdInfosArray;
}

function getBillingAccountArray(billAccnts){
	var billAccntsArray = [];
	if(billAccnts){
		for (var i = 0; i < billAccnts.length; i++) {
			billAccntsArray.push({
				"chan:ACCOUNT_NAME": billAccnts[i].ACCOUNT_NAME,
				"chan:GENERATE_CALL_DETAILS_FLAG": billAccnts[i].GENERATE_CALL_DETAILS_FLAG,
				"chan:BILL_MEDIUM": billAccnts[i].BILL_MEDIUM,
				"chan:NUMBER_OF_COPIES": billAccnts[i].NUMBER_OF_COPIES,
				"chan:EXCHANGE_RATE_TYPE" : getExchangeRateTypeArray(billAccnts[i].EXCHANGE_RATE_TYPE),
				"chan:CURRENCY" : getCurrencyArray(billAccnts[i].CURRENCY),
				"chan:PAYMENT_TERMS": billAccnts[i].PAYMENT_TERMS,
				"chan:PRIMARY_ACCOUNT_FLAG": billAccnts[i].PRIMARY_ACCOUNT_FLAG,
				"chan:BILLING_ACCOUNT_CODE": billAccnts[i].BILLING_ACCOUNT_CODE,
				"chan:CHARGE_TYPE_ID": billAccnts[i].CHARGE_TYPE_ID,
				"chan:DELETE": billAccnts[i].DELETE,
				"chan:PROFILE_ID": billAccnts[i].PROFILE_ID,
				"chan:SERVICE_ID": billAccnts[i].SERVICE_ID,
				"chan:VALID_TO": billAccnts[i].VALID_TO
			});
		}
	}
	return billAccntsArray;
}

function getAddressArray(addresses){
	var addressArray = [];
	if (addresses) {
		for (var i = 0; i < addresses.length; i++) {
			addressArray.push({
				"chan:ADDRESS_SEQUENCE": addresses[i].ADDRESS_SEQUENCE,
				"chan:ADDRESS_TYPE": addresses[i].ADDRESS_TYPE,
				"chan:PO_BOX": addresses[i].PO_BOX,
				"chan:ADDRESS_DETAIL_1": addresses[i].ADDRESS_DETAIL_1,
				"chan:ADDRESS_DETAIL_2": addresses[i].ADDRESS_DETAIL_2,
				"chan:ADDRESS_DETAIL_3": addresses[i].ADDRESS_DETAIL_3,
				"chan:STREET_NAME": addresses[i].STREET_NAME,
				"chan:AREA": addresses[i].AREA,
				"chan:NUMBER": addresses[i].NUMBER,
				"chan:FLOOR": addresses[i].FLOOR,
				"chan:BUILDING_NAME": addresses[i].BUILDING_NAME,
				"chan:CITY": addresses[i].CITY,
				"chan:EMIRATE": addresses[i].EMIRATE,
				"chan:COUNTRY": addresses[i].COUNTRY,
				"chan:YEARS_AT_ADDRESS": addresses[i].YEARS_AT_ADDRESS,
				"chan:INTERNATIONAL_ZIP_CODE": addresses[i].INTERNATIONAL_ZIP_CODE,
				"chan:CONTACT_LOCATION_KEY": addresses[i].CONTACT_LOCATION_KEY
			});
		}
	}
	return addressArray;
}

function getExchangeRateTypeArray(exchangeRate){
var exchangeRate_Array =[];
if(exchangeRate){
	for (var i=0;i< exchangeRate.length;i++){
		exchangeRate_Array.push(exchangeRate[i].EXCHANGE_RATE_TYPE);
	}
}

}

function getCurrencyArray(currency){
var currency_Array =[];
if(currency){
	for(var i=0;i<currency.length;i++){
		currency_Array.push(currency[i].CURRENCY);
	}
}

}