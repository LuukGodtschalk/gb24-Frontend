module.exports = function () {
  var express = require('express');
  var app = express();

  app.use(express.static(__dirname + '/../www'));
  app.listen(8080);
  return app;
};