var express = require('express');
var requestIp = require('request-ip');
var app = express();

app.get('/main', function(req, res){
  res.send('main page')
  console.log("client IP: " +requestIp.getClientIp(req));
})

app.listen(3003, function(){
  console.log("Express server started at port 3003");
});