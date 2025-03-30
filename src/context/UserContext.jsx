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
    text_speak.lang = 'hi-GB'; // We can also use "en-US" or "en-IN" or "en-GB" (DEPENDING ON THE LANGUAGE)
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt){
    let text = await run(prompt)
    let newText=text.split("**")&&text.split("*")&&text.replace("google","Niladri Dutta")&&text.replace("Google","Niladri");
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
    let transcript=e.results[currentindex][0].transcript.trim().toLowerCase();
    console.log(transcript);
    setPrompt(transcript);
    takeCommand(transcript);
  }

  function takeCommand(command) {
    const sites = {
      youtube: "https://www.youtube.com",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      google: "https://www.google.com",
      spotify: "https://www.spotify.com",
      netflix: "https://www.netflix.com",
      amazon: "https://www.amazon.com",
      twitter: "https://www.twitter.com",
      linkedin: "https://www.linkedin.com",
      whatsapp: "https://web.whatsapp.com",
      snapchat: "https://www.snapchat.com",
      pinterest: "https://www.pinterest.com"
      //  Add more sites as needed
  };
  
  for (const site in sites) {
      if (command.includes("open") && command.includes(site)) {
          speak(`Opening ${site.charAt(0).toUpperCase() + site.slice(1)}`);
          setResponse(true);
          setPrompt(`Opening ${site.charAt(0).toUpperCase() + site.slice(1)}...`);
          
          setTimeout(() => {
              window.open(sites[site], "_blank");
              setSpeaking(false);
          }, 1000);
          return;
      }
  }
  if (command.includes("play music")) {
      speak("Playing music for you.");
      setResponse(true);
      setPrompt("Playing music...");
      
      setTimeout(() => {
          window.open("https://www.spotify.com", "_blank");
          setSpeaking(false);
      }, 1000);
      return;
  }
  aiResponse(command);
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
