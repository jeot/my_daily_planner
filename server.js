const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);
const port = process.env.PORT || 5000;

let users = [];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
console.log(path.join(__dirname, "client", "build"));

app.get("/", function(req, res) {
    // this don't work yet!
    console.log("sending index.html file...");
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
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

app.listen(port, function() {
    console.log("example app listening on port", port);
});
