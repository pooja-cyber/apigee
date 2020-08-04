var output = context.getVariable("du.api.AES.output");
if(output){
	var arrayOutput = output.split(',');
	var targetUsername = arrayOutput[0];
	var targetPassword = arrayOutput[1];
	var opflag1 = arrayOutput[2];
	var opflag2 = arrayOutput[3];
	var opflag3 = arrayOutput[4];
	context.setVariable("du.config.selfcareUsername", targetUsername);
	context.setVariable("du.api.opflag1", opflag1);
	context.setVariable("du.api.opflag2", opflag2);
	context.setVariable("du.api.opflag3", opflag3);
	context.setVariable("du.config.selfcarePassword", targetPassword);
}