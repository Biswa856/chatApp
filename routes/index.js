var express = require('express');
const chatController = require('../controllers/chatController');
var ChatController = require('../controllers/chatController')
var app = express.Router();


connection.connect();

app.get('/person',chatController.getPersonList)


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
connection.end();

module.exports = router;
