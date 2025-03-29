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
    text_speak.lang = 'hi-GB'; // We can also use "en-US" or "en-IN" or "en-GB"
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt){
    let text = await run(prompt)
    let newText=text.split("**")&&text.split("*")&&text.replace("google","Niladri Dutta")&&text.replace("Google","Niladri Dutta");
    console.log(newText);
    setPrompt(newText.split('.').slice(0, 2).join('.'));
    speak(newText.split('.').slice(0, 2).join('.'));
    setResponse(true);
    setTimeout(()=>{
      setSpeaking(false);
    },15000)
  }

  let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition=new speechRecognition();
  recognition.onresult=(e)=>{
    let currentindex=e.resultIndex;
    let transcript=e.results[currentindex][0].transcript;
    console.log(transcript);
    setPrompt(transcript);
    aiResponse(transcript);
    // takeCommand(transcript.tolowerCase());
  }

  // function takeCommand(command){
  //   command=command.toLowerCase();
  //   if(command.includes("open") && command.includes("youtube")){
  //     window.open("https://www.youtube.com","_blank");
  //     speak("Opening Youtube");
  //     setResponse(true);
  //     setPrompt("Opening Youtube.....");
  //     setTimeout(() => {
  //       setSpeaking(false);
  //     }, 5000);
  //   }else{
  //     aiResponse(command);
  //   }
  // }

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
