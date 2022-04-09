import React, { useEffect, useState } from "react";
import "../App.scss";

export default function ChatBox() {
  const [person, setPerson] = useState([]);
  const [userId, setUserId] = useState(1);
  const [messageData, setMessageData] = useState([]);
  const [activeChat, setAciveChat] = useState();
  const [recipentName, setRecipentName] = useState("");

  /**
   * function to get chat history data
   * @param {*} ele
   * @returns {void}
   */
  async function getChatHistory(ele) {
    var data = await fetch(
      `${process.env.REACT_APP_API_URL}chat-history?id=${ele.chat_space_id}`
    );

    data = await data.json();
    data = data.data;

    console.log(data);
    setMessageData(data);
    setAciveChat(ele.chat_space_id);
    setRecipentName(ele.name);
  }

  useEffect(() => {
    async function getData() {
      var data = await fetch(`${process.env.REACT_APP_API_URL}person?id=${userId}`);

      data = await data.json();
      data = data.data;

      setPerson(data);
    }
    getData();
  }, []);
  console.log(person);

  /**
   * function to send message to recipents
   * @param {*} e
   * @returns {void}
   */
  async function sendMessage(e) {
    e.preventDefault();
    var msg = e.target.msg.value;
    e.target.msg.value = "";

    var data = await fetch(`${process.env.REACT_APP_API_URL}send-message`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        sender_id: userId,
        chat_space_id: activeChat,
      }),
    });
    data = await data.json();
    console.log(data);
  }

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div className="left">
            <div className="top">
              <input type="text" placeholder="Search" />
              <a href="#" className="search"></a>
            </div>
            <dl className="people">
              {person.map((ele, index) => {
                return (
                  <dt
                    className={
                      activeChat == ele.chat_space_id
                        ? "person active"
                        : "person"
                    }
                    key={ele.chat_space_id}
                    onClick={() => {
                      getChatHistory(ele);
                    }}
                  >
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg"
                      alt=""
                    />
                    <span className="name">{ele.name}</span>
                    <span className="time">
                      {new Date(ele.created_at).toLocaleTimeString()}
                    </span>
                    <span className="preview">{ele.messages}</span>
                  </dt>
                );
              })}
            </dl>
          </div>
          <div className="right">
            <div className="top">
              <span>
                To: <span className="name">{recipentName}</span>
              </span>
            </div>
            <div className="chat active-chat" data-chat="person1">
              <div className="conversation-start">
                <span>Today, 6:48 AM</span>
              </div>
              {messageData.map((ele, index) => {
                return (
                  <div
                    className={
                      ele.sender_id != userId ? "bubble you" : "bubble me"
                    }
                    key={index}
                  >
                    {ele.messages}
                  </div>
                );
              })}
            </div>
            <form className="write" onSubmit={sendMessage}>
              <input type="text" name="msg" placeholder="Type Message" />
              <button type="submit" className="write-link send"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
