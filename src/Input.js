import React from 'react';
import { useState } from "react";
import Nav from "./Nav";
import {db} from "./Firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const Create = () => {
  const [input, setInput] = React.useState("")
  const [sender, setSender] = React.useState(getSenderType())

  const handleResize = () => {
    setSender(getSenderType())
  }
  window.addEventListener("resize", handleResize)
  function getSenderType() {
    return window.innerWidth > 500 ? "PC" : "Mobile"
  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const messageCol = collection(db, "message")
      const docRef = await addDoc(messageCol, {
        text: input,
        sender: sender,
        timestamp: serverTimestamp()
      })
      setInput("")
      // const pop = document.querySelector(".pop-up")
      // pop.classList.add("pop")
      // setTimeout(() => {
      //   pop.classList.remove("pop")
      // }, 5000)
    }catch (e) {
      console.log("Error adding document", e)
    }
  }
  return (
    <div className="create-section">
      <form className="input-area" onSubmit={handleSubmit}>
        <input 
          className="input-area"
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter Text"
          required  
        />
        <input 
          className="device-type"
          type="text"
          value={getSenderType()}
          readOnly
        />
        <button className="post-btn"><i className="fa fa-paper-plane"></i></button>
      </form>
    </div>
  )
}

export default Create;