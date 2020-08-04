var userName = context.getVariable("du.username");
var password = context.getVariable("du.password");
validate(userName, password);

function validate(userName, password) {
    var valid = -1;
    var unArray = ["markwalt", "jongossy", "lisacain", "jenndemp"];
    var pwArray = ["mark1234", "flomaygo", "lisa1234", "jenny1234"];

    for (var i=0; i < unArray.length; i++) {
        if ((userName == unArray[i]) && (password == pwArray[i])) {
            valid = i;
            break;
        }
    }

    if (valid != -1) {
      context.setVariable("du.validLogin", true);
    }
    else {
      context.setVariable("du.validLogin", false);
    }
}