/* global __dirname */
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var hbs = require("hbs"); //Render handlebars


////////////////////
///// App setup
////////////////////
//Keep information private by storing in a config file. Make sure to add config file to .gitignore
if (process.env.NODE_ENV == "development") { //Set process env vars in gulp/node export NODE_ENV=dev server.js
	var conf = require("./config");
	console.log('\n***In Development Environment***');
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Configure the root of the folder
//to reference static files, include 'public/' as root
app.use('/public', express.static(__dirname + '/public'));

app.set("view engine", "html"); //render .html as handlebars
app.engine("html", hbs.__express); //set view engine to handlebars


////////////////////
///// Routes
////////////////////
app.get("/", function (req, res) {
	res.render(path.join(__dirname, "public", "views", "index.html"), {name:"asdf", greeting:"asdf"}); //Handlebars stuff
});

app.listen(8080, function () {
	//console.info('Server listening on port: ' + this.address().port);
	console.info('Server Listening');
});
