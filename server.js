var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");

var dotenv = require("dotenv");
dotenv.config();

var mysql = require("mysql");
var connection = mysql.createConnection({
	host: process.env.MYSQL_CONNECTION_HOST,
	user: process.env.MYSQL_CONNECTION_USER,
	password: process.env.MYSQL_CONNECTION_PASS,
	database: process.env.MYSQL_CONNECTION_DB
});
connection.connect(err => {
	if (err !== null) {
		console.log("connection call back, err:", err);
		console.log("ERROR! Sql connection error!");
	} else {
		console.log("connection to db successful.");
	}
});

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

app.post("/todos", function(req, res) {
	// check...
	const checkOK = true;
	if (checkOK) {
		console.log("post /todos");
		const user = req.body.user;
		const email = req.body.user.email;
		const date = req.body.date;
		//console.log("user:", user);
		//console.log("date:", date);
		// get from databasae

		const email_quary =
			'SELECT my_db.users.id FROM my_db.users WHERE my_db.users.email = "' +
			email +
			'"';
		const query =
			"SELECT * FROM my_db.todo WHERE my_db.todo.user_id = (" +
			email_quary +
			");";

		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.log(err);
				res.status(507).send("Something bad happend!");
			}
			//throw err;
			else {
				console.log("The todos rows: ", rows);
				setTimeout(() => res.json(rows), 100); // delay just for visual
			}
		});
	} else {
		setTimeout(() => res.send("bad!"), 100);
	}
});

///////////
var http = require("http");
var port = process.env.PORT || 3000;
console.log(`Your port is ${process.env.PORT}`);
var server = http.createServer(app);
server.listen(port);

// should not close the connection!
// connection.end();
