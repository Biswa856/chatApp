var message = require('../models/message');
class ChatController {
    constructor() {
        //
    }
    getPersonList = (req, res, next) => {

        userId = req.query.id
        data = message.getPersonData(userId);
        return res.json({
            "data": data
        })

    }
}
module.exports = new ChatController();