var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();

let users = [{ name: "shamim" }];
let counter = 0;

app.use(cors());
app.use(express.json());
app.use(
	express.static(path.join(__dirname, "client", "build"), { index: false })
);

app.get("/", function(req, res) {
	console.log("sending index.html file...");
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/counter", function(req, res) {
	counter++;
	res.json({ counter: counter });
});

app.get("/users", function(req, res) {
	res.json(users);
});

app.post("/users", function(req, res) {
	const new_user = { name: req.body.name, password: req.body.password };
	users.push(new_user);
	res.status(201).send();
});

app.get("/api", function(req, res) {
	console.log("api called.");
	// send a json:
	res.send({ a: "hello", b: "goodbye" });
	//res.json({ a: "A", b: "B"});

	// or send a text:
	//res.send("api is working.");
});

/////////////
var http = require("http");
var port = process.env.PORT || 3000;
console.log(`Your port is ${process.env.PORT}`);
var server = http.createServer(app);
server.listen(port);
