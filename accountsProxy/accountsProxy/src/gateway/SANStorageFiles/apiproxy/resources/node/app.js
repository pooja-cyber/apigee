var express = require("express");
var app = express();

app.use("/files", express.static("SAN"));

app.listen(3000,function(){
	console.log("Started server for SAN storage files");
});
