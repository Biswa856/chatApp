var connection = require("../database/config");
class Message {
  constructor() {
    this.connection = connection;
    this.connection.connect();
  }

  async getPersonData(userId) {
    const sqlSearch =
      "SELECT users.name,chat_space_messages.messages,chat_space_messages.chat_space_id,chat_space_messages.created_at FROM users inner join chat_space_participants on chat_space_participants.user_id = users.id inner join chat_space_messages on chat_space_messages.chat_space_id = chat_space_participants.chat_space_id WHERE users.id =? group by chat_space_messages.chat_space_id order by chat_space_messages.created_at asc;";
    this.query = this.connection.format(sqlSearch, [userId]);

    this.result = await new Promise((resolve, reject) => {
      this.connection.query(this.query, async (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
    return this.result;
  }

  async getChatHistory(spaceId) {
    const sqlSearch =
      "SELECT * FROM chatapp.chat_space_messages where chat_space_id=?";
    this.query = this.connection.format(sqlSearch, [spaceId]);

    this.result = await new Promise((resolve, reject) => {
      this.connection.query(this.query, async (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
    return this.result;
  }

  async saveMessage(data) {
    const sqlSearch =
      "INSERT INTO `chatapp`.`chat_space_messages` (`sender_id`, `chat_space_id`, `messages`) VALUES (?, ?, ?)";
    this.query = this.connection.format(sqlSearch, [
      data.sender_id,
      data.chat_space_id,
      data.message,
    ]);

    await new Promise((resolve, reject) => {
      this.connection.query(this.query, async (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
    return "Message Sent Succefully";
  }
}

module.exports = new Message();
