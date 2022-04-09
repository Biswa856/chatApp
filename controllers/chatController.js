var message = require("../models/message");
class ChatController {
  constructor() {
    //
  }
  getPersonList = async (req, res, next) => {
    var userId = req.query.id;
    var data = await message.getPersonData(userId);
    return res.json({
      data: data,
    });
  };

  getChatHistory = async (req, res, next) => {
    var spaceId = req.query.id;

    var data = await message.getChatHistory(spaceId);

    return res.json({
      data: data,
    });
  };

  saveMessage = async (req, res, next) => {
    var data = req.body;
    var response = await message.saveMessage(data);
    return res.json({
      data: response,
    });
  };
}
module.exports = new ChatController();
