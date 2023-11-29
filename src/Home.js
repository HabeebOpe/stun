import React from 'react';
import Nav from "./Nav";
import Input from "./Input";
import { useEffect, useState } from "react";
import { db } from "./Firebase";
import { onSnapshot, collection, getDocs, setDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import "./App.css";
import mobileImage from "./asset/mobile.png"
import pcImage from "./asset/pc.jpg"

const copyText = (textToCopy) => {
  navigator.clipboard.writeText(textToCopy)
    .then(function () {
      alert("Text copied")
    })
    .catch(function (err) {
      console.log("Unable to copy text to clipboard", err)
    })
}

const Home = () => {
  const [messages, setMessages] = React.useState([])

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("timestamp", "desc"))
    const unsub = onSnapshot(q, (snapshot) => 
      setMessages(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    );
    return unsub;
  }, [])
  
  const handleDelete = async (id) => {
    const docRef = doc(db, "message", id)
    await deleteDoc(docRef)
  }

  const listItem = document.querySelectorAll("#list")
  listItem.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("appear")
    })
  })
  const handleCopy = (text) => {
    copyText(text)
  }
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toMillis){
      const date = new Date(timestamp.toMillis());
      const options = {month: "short", day: "numeric", hour: "numeric", minute: "numeric",  hour12: true,};
      return date.toLocaleDateString("en-US", options)
    }
    else {
      return "invalid Date";
    }
  }

const messageList = messages.map((message) => {
return(
  <li id="list" key={message.id}>
    <img src={message.sender == "Mobile" ? mobileImage : pcImage} alt="sender image" />
    <div className="text-area">
      <p className="message-text">{message.text}</p>
      <p className="message-date-and-copy">
        <span className="date-and-time">{formatDate(message.timestamp)}</span>
      </p>
    </div>
    <div className="trash-edit">
      <span onClick={() => handleDelete(message.id)} className="open-del"><i className="fa fa-trash"></i></span>
      <span onClick={() => handleCopy(message.text)} className="copy-btn"><i className="fa fa-copy"></i></span>
    </div>
  </li>
)})
return (
  <div className="main-section">
    <Nav />
    <div className="message-menu">
      <p className="first-message">Coded and Designed by the user with love</p>
      <ul>
        {messageList}
      </ul>
      <p className="first-message">Coded and Designed by the user with love</p>
    </div>
    <Input />
  </div>
)}

export default Home;
