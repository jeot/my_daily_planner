var express = require("express");
var cors = require("cors");

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.get("/", function(req, res) {
    res.send("hello World!");
});

app.get("/api", function(req, res) {
    console.log("api called.");
    // send a json:
    res.send({ a: "hello", b: "goodbye" });
    // or send a text:
    //res.send("api is working.");
});

app.get("/api_id", function(req, res) {
    console.log("api_id called.");
    const id = req.query.query_id;
    res.send({ id: id, next_id: id });
});

app.listen(port, function() {
    console.log("example app listening on port", port);
});
