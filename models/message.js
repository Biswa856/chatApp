 var connection = require('../database/config')
 class Message{

    constructor(){
        this.connection = connection;
        this.connection.connect()
    }
 
    async getPersonData(userId){
        const sqlSearch = "SELECT * FROM chatHistory WHERE user_Id =?"
        this.query = mysql.format(sqlSearch, [userId]);
        await this.connection.query(this.query,async(err,res)=>{
            if(err) throw(err);
            this.result = res;
        })
        return this.result;
    }

}
module.exports = new Message();