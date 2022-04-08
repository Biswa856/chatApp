import React, { useState } from 'react'
import '../App.scss'




export default function ChatBox() {
    const[person,setPerson] = useState([]);
    
  return (
    <div>
      <div className="wrapper">
    <div className="container">
        <div className="left">
            <dl className="people">
                {person.map((ele,index)=>{
                  return (
                    <dt className="person" key={index}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
                    <span className="name">{ele.name}</span>
                    <span className="time">{ele.time}</span>
                    <span className="preview">{ele.recentTxt}</span>
                </dt>
                  )
                })}
               
            </dl>
        </div>
        <div className="right">
            <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
            <div className="chat" data-chat="person1">
                <div className="conversation-start">
                    <span>Today, 6:48 AM</span>
                </div>
                <div className="bubble you">
                    Hello,
                </div>
                <div className="bubble you">
                    it's me.
                </div>
                <div className="bubble you">
                    I was wondering...
                </div>
            </div>
            <div className="write">
                <input type="text" />
                <a href="" className="write-link send"></a>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}
