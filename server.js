var express = require("express");
var app = express();
const port = process.env.PORT || 5000;

app.get("/", function(req, res) {
    res.send("hello World!");
});

app.get("/api", function(req, res) {
    res.send("we will get you the api!");
});

app.listen(port, function() {
    console.log("example app listening on port", port);
});
