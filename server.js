var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("hello-world!");
});

app.listen(3001, function() {
    console.log("example app listening on port 3001.");
});
