var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 8000;

app.use(express.static("server/public", {
  index: "views/index.html"
}));

app.listen(port, function() {
  console.log("Server listening on port ", port);
});
