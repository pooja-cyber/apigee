var results = context.getVariable("ldap.LD-RetrieveLdapContractsAttributes.search.result");
print(results.length);
var error = true;
var index = 1;
var customerId1 = "",
    customerId = "",
    contractCode = "",
    ratePlan = "",
    msisdns = "";

while(error){
    customerId1 = context.getVariable("ldap.LD-RetrieveLdapContractsAttributes.search.result["+index+"].attribute.customerID[1]");
    if(!customerId1){
        break;
    }else{
        customerId = customerId1;
        ratePlan = context.getVariable("ldap.LD-RetrieveLdapContractsAttributes.search.result["+index+"].attribute.ratePlan[1]");
        contractCode = context.getVariable("ldap.LD-RetrieveLdapContractsAttributes.search.result["+index+"].attribute.contractCode[1]") + "," + contractCode;
        msisdns = context.getVariable("ldap.LD-RetrieveLdapContractsAttributes.search.result["+index+"].attribute.serviceNumber[1]") + "," + msisdns;
    }
    index++;
}
if(customerId){
    context.setVariable("du.api.customerId", customerId);
    contractCode = contractCode.slice(0, contractCode.length -1 );
    context.setVariable("du.api.contractCode", contractCode);
    msisdns = msisdns.slice(0, msisdns.length - 1);
    context.setVariable("du.api.msisdn", msisdns);
    context.setVariable("du.api.ratePlan", ratePlan);
}