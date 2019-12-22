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
	if (process.env.NODE_ENV === "development")
		res.sendFile(path.join(__dirname, "client", "public", "index.html"));
	else res.sendFile(path.join(__dirname, "client", "build", "index.html"));
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

// return this on get /todos
TEST_TODOS_ARRAY = [
	{ id: 0, isDone: false, isImportant: true, title: "important 123" },
	{ id: 1, isDone: true, isImportant: false, title: "simple 123" },
	{ id: 2, isDone: false, isImportant: false, title: "dsfsd" },
	{ id: 3, isDone: true, isImportant: true, title: "buy milk" },
	{ id: 4, isDone: false, isImportant: false, title: "kiss a frog!" }
];

app.post("/todos", function(req, res) {
	// check...
	const checkOK = true;
	if (checkOK) {
		console.log("post /todos");
		const user = req.body.user;
		const date = req.body.date;
		console.log("user:", user);
		console.log("date:", date);
		setTimeout(() => res.json(TEST_TODOS_ARRAY), 1000); // delay just for visual
	} else {
		setTimeout(() => res.send("bad!"), 1000);
	}
});

/////////////
var http = require("http");
var port = process.env.PORT || 3000;
console.log(`Your port is ${process.env.PORT}`);
var server = http.createServer(app);
server.listen(port);
