'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    projectRoot = __dirname;

app.set('port', (process.env.PORT || 3009));

app.use(express.static(projectRoot));

// views is directory for all template files
app.set('views', projectRoot + '/src');
app.set('view engine', 'html');

app.get('/*', function (req, res) {
  res.sendFile(path.join(projectRoot + '/index.html'));
});

var port = 3009;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
