var express = require('express')
var app = express()

app.use(express.static(__dirname + '/www'))

var server = app.listen(3011, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Client for authorization managment at http://%s:%s', host, port)
})