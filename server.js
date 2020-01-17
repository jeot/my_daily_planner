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
	if (err) {
		console.error("db error connecting: " + err.stack);
		return;
	}
	console.log("db connected as id " + connection.threadId);
});

Date.prototype.toMysqlFormat = function() {
	return this.toISOString()
		.slice(0, 19)
		.replace("T", " ");
};
let users = [{ name: "shamim" }];
let counter = 0;

app.use(cors());
app.use(express.json());
app.use(
	express.static(path.join(__dirname, "client", "build"), { index: false })
);

app.get("/", function(req, res) {
	console.log("---------------");
	console.log("get /");
	console.log("sending index.html file...");
	if (process.env.NODE_ENV === "development")
		res.sendFile(path.join(__dirname, "client", "public", "index.html"));
	else res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/counter", function(req, res) {
	console.log("---------------");
	console.log("get /counter");
	counter++;
	res.json({ counter: counter });
});

app.get("/users", function(req, res) {
	console.log("---------------");
	console.log("get /users");
	res.json(users);
});

app.post("/users", function(req, res) {
	console.log("---------------");
	console.log("post /users");
	const new_user = { name: req.body.name, password: req.body.password };
	users.push(new_user);
	res.status(201).send();
});

app.post("/todos", function(req, res) {
	// check...
	const checkOK = true;
	if (checkOK) {
		console.log("---------------");
		console.log("post /todos");
		const user = req.body.user;
		const email = req.body.user.email;
		const date = new Date(req.body.date);
		//console.log("user:", user);
		//console.log("email:", email);
		//console.log("date:", date);
		// get from databasae
		//var sql = mysql.format(
		//	"SELECT my_db.users.id FROM my_db.users WHERE my_db.users.email = ?",
		//	[email]
		//);
		//console.log(sql);
		connection.query(
			"SELECT my_db.users.id FROM my_db.users WHERE my_db.users.email = ?",
			[email],
			function(error, results, fields) {
				if (error) {
					console.log(
						"db query error while retriving user_id from email"
					);
					return;
				}
				console.log("query succeed...");
				console.log("result:", results);
				if (results.length != 1) {
					console.log("no such email exists in db!");
					res.status(404).send("no such email exists in db!");
					return;
				}
				user_id = results[0].id;
				console.log("user_id:", user_id);
				console.log("date:", date);
				let date_1 = new Date(date);
				date_1.setHours(0);
				date_1.setMinutes(0);
				date_1.setSeconds(0);
				date_1.setMilliseconds(0);
				let date_2 = new Date(date_1);
				date_2.setDate(date_2.getDate() + 1);
				console.log("date:", date);
				console.log("date_1:", date_1);
				console.log("date_2:", date_2);
				const pre_sql =
					"SELECT * FROM my_db.todo WHERE my_db.todo.user_id = ? AND datetime >= ? AND datetime < ?";
				const sql = mysql.format(pre_sql, [user_id, date_1, date_2]);
				//console.log(sql);
				connection.query(sql, [user_id], function(
					error,
					results,
					fields
				) {
					if (error) {
						console.log("db query error: select all todos");
						res.status(507).send("db query error!");
						return;
					} else {
						console.log(
							"send back the todo list, count:",
							results.length
						);
						res.json(results);
					}
				});
			}
		);
	} else {
		setTimeout(() => res.send("ERROR: authentication!"), 10);
	}
});

app.post("/new_todo", function(req, res) {
	// check...
	const checkOK = true;
	if (checkOK) {
		console.log("---------------");
		console.log("post /new_todos");

		const user = req.body.user;
		const email = req.body.user.email;
		const todo = req.body.todo;
		const datetime = new Date(todo.datetime);
		console.log("user:", user);
		console.log("email:", email);
		console.log("date:", datetime);
		console.log("date(formated):", datetime.toMysqlFormat());
		console.log("todo:", todo);
		connection.query(
			"SELECT my_db.users.id FROM my_db.users WHERE my_db.users.email = ?",
			[email],
			function(error, results, fields) {
				if (error) {
					console.log(
						"db query error while retriving user_id from email"
					);
					return;
				}
				console.log("query succeed...");
				console.log("result:", results);
				if (results.length != 1) {
					console.log("no such email exists in db!");
					res.status(404).send("no such email exists in db!");
					return;
				}
				user_id = results[0].id;
				console.log(user_id);
				let mysql_todo = todo;
				mysql_todo.user_id = user_id;
				mysql_todo.datetime = datetime.toMysqlFormat();
				//console.log(mysql_todo);
				//var sql = mysql.format("INSERT INTO  my_db.todo SET ?", [mysql_todo]);
				//console.log(sql);
				connection.query(
					"INSERT INTO my_db.todo SET ?",
					[mysql_todo],
					function(error, results, fields) {
						if (error) {
							console.log("db query error: select all todos");
							res.status(507).send(
								"db query error: select all todos"
							);
							return;
						} else {
							console.log("new todo insert successrul!");
							res.status(200).json({});
						}
					}
				);
			}
		);
	} else {
		setTimeout(() => res.send("ERROR: authentication!"), 10);
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
