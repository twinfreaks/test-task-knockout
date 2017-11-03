var express = require('express');
var app = express();
var cors = require('cors');
var data = require("./data.json");
var data2 = require("./data2.json");
var bodyParser = require("body-parser");
var fs = require('fs');

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("app listening at http://%s:%s", host, port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/data', function (req, res) {
  res.send(fs.readFileSync("./data2.json"));
});

app.post('/data', function (req, res) {
  console.log('post', req.body);
  
  fs.writeFile("./data2.json", JSON.stringify(req.body), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    res.send(fs.readFileSync("./data2.json"));
  });
  
});

app.delete('/data', function (req, res) {
  console.log('post', req);
  
});
