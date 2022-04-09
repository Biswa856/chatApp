var express = require("express");
const chatController = require("../controllers/chatController");

var app = express.Router();

app.get("/person", chatController.getPersonList);

app.get("/chat-history", chatController.getChatHistory);

app.post("/send-message", chatController.saveMessage);


/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = app;
