import React, { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';

function App() {
  let {recognition}=useContext(datacontext)
  
  return (
    <div>
      <div className="main">
        <img src={va} alt="" id="Shifra" />
        <span>I'm Shifra, Your Advanced Virtual Assitant</span>
        <button onClick={()=>{
          recognition.start();
        }}>Click Here <CiMicrophoneOn /></button>
      </div>
    </div>
  )
}

export default App
