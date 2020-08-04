var error = true;
var index = 1;
var uuid = "",
    customerId = "",
    customerCode = "",
    segment = "",
    username = "";
while(error){
    uuid = context.getVariable("ldap.LD-RetrieveLdapPeopleAttributes.search.result["+index+"].attribute.uid[1]");
    if(!uuid){
        break;
    }else{
        customerId = uuid;
        segment = context.getVariable("ldap.LD-RetrieveLdapPeopleAttributes.search.result["+index+"].attribute.customerType[1]");
        customerCode = context.getVariable("ldap.LD-RetrieveLdapPeopleAttributes.search.result["+index+"].attribute.customerCode[1]") + "," + customerCode;
        username = context.getVariable("ldap.LD-RetrieveLdapPeopleAttributes.search.result["+index+"].attribute.cn[1]") + "," + username;
    }
    index++;
}
if(customerId){
    context.setVariable("du.api.customerId", customerId);
    customerCode = customerCode.slice(0, customerCode.length -1 );
    context.setVariable("du.api.customerCode", customerCode);
    username = username.slice(0, username.length - 1);
    context.setVariable("du.api.selfcare_username", username);
    context.setVariable("du.api.segment", segment);
}