var express = require("express");
var cors = require("cors");

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.get("/", function(req, res) {
    res.send("hello World!");
});

app.get("/api", function(req, res) {
    console.log("some api request received. sending json object back.");
    // send a json:
    res.send({ a: "hello", b: "goodbye" });
    // or send a text:
    //res.send("api is working.");
});

app.listen(port, function() {
    console.log("example app listening on port", port);
});
