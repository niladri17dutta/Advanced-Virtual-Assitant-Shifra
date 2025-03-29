import React, { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  let {recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse}=useContext(datacontext)
  
  return (
    <div>
      <div className="main">
        <img src={va} alt="" id="Shifra" />
        <span>I'm Shifra, Your Advanced Virtual Assitant</span>
        {!speaking ?
        <button onClick={()=>{
          setPrompt("Listening...");
          setSpeaking(true);
          setResponse(false);
          recognition.start();
        }}>Click Here <CiMicrophoneOn /></button>
        :
        <div className='response'>
          {!response ?
          <img src={speakimg} alt="" id="speak" />:<img src={aigif} alt="" className="aispeakq" />
          }
          <p>{prompt}</p>
        </div>
        }
      </div>
    </div>
  )
}

export default App
