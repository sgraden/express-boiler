var express = require("express");
var app = express();
var hbs = require("hbs");

app.set("view engine", "html");
app.engine("html", hbs.__express);

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.get("/Hi", function (req, res) {
	res.render("index", {name:"bob", greeting:"jonathan"});
});

app.listen(8008, function () {
	console.info('Server listening on port ' + this.address().port);
});