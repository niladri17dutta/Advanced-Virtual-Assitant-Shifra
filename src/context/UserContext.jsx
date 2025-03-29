import React, { createContext} from 'react'
import run from '../gemini';
export const datacontext=createContext();

function UserContext({children}) {
  let [speaking,setSpeaking]=React.useState(false);
  let [prompt,setPrompt]=React.useState("Listening....");
  let [response,setResponse]=React.useState(false);

  function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.volume=1;
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang = 'hi-GB';
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt){
    let text = await run(prompt)
    let newText=text.split("**")&& text.split("*")&&text.split("*")&&text.replace("google","Niladri Dutta")&&text.replace("Google","Niladri Dutta");
    // console.log(text);
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(()=>{
      setSpeaking(false);
    },5000)
  }

  let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition=new speechRecognition();
  recognition.onresult=(e)=>{
    let currentindex=e.resultIndex;
    let transcript=e.results[currentindex][0].transcript;
    // console.log(transcript);
    setPrompt(transcript);
    aiResponse(transcript);
    // takeCommand(transcript.tolowerCase());
  }

  let value={
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  }

  return (
    <div>
        <datacontext.Provider value={value}>
          {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContext
