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
    if (command.includes("open") && command.includes("youtube")) {
      speak("Opening YouTube");
      setResponse(true);
      setPrompt("Opening YouTube...");
      
      setTimeout(() => {
        window.open("https://www.youtube.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening YouTube by 1 second
    }
    else if (command.includes("open") && command.includes("facebook")) {
      speak("Opening Facebook");
      setResponse(true);
      setPrompt("Opening Facebook...");
      
      setTimeout(() => {
        window.open("https://www.facebook.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening YouTube by 1 second
    }
    else if (command.includes("open") && command.includes("instagram")) {
      speak("Opening Instagram");
      setResponse(true);
      setPrompt("Opening Instagram...");
      
      setTimeout(() => {
        window.open("https://www.instagram.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Instagram by 1 second
    }
    else if (command.includes("open") && command.includes("google")) {
      speak("Opening Google");
      setResponse(true);
      setPrompt("Opening Google...");
      
      setTimeout(() => {
        window.open("https://www.google.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening google by 1 second
    }
    else if (command.includes("open") && command.includes("spotify")) {
      speak("Opening Spotify");
      setResponse(true);
      setPrompt("Opening Spotify...");
      
      setTimeout(() => {
        window.open("https://www.spotify.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Spotify by 1 second
    }
    else if (command.includes('play music')) {
      speak('Playing music for you.');
      setResponse(true);
      setPrompt("Playing music...");
      
      setTimeout(() => {
        window.open("https://www.spotify.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Spotify by 1 second
    }
    else if (command.includes("open") && command.includes("netflix")) {
      speak("Opening Netflix");
      setResponse(true);
      setPrompt("Opening Netflix...");
      
      setTimeout(() => {
        window.open("https://www.netflix.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Netflix by 1 second
    }
    else if (command.includes("open") && command.includes("amazon")) {
      speak("Opening Amazon");
      setResponse(true);
      setPrompt("Opening Amazon...");
      
      setTimeout(() => {
        window.open("https://www.amazon.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Amazon by 1 second
    }
    else if (command.includes("open") && command.includes("twitter")) {
      speak("Opening Twitter");
      setResponse(true);
      setPrompt("Opening Twitter...");
      
      setTimeout(() => {
        window.open("https://www.twitter.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Twitter by 1 second
    }
    else if (command.includes("open") && command.includes("linkedin")) {
      speak("Opening LinkedIn");
      setResponse(true);
      setPrompt("Opening LinkedIn...");
      
      setTimeout(() => {
        window.open("https://www.linkedin.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening LinkedIn by 1 second
    }
    else if (command.includes("open") && command.includes("whatsapp")) {
      speak("Opening WhatsApp");
      setResponse(true);
      setPrompt("Opening WhatsApp...");
      
      setTimeout(() => {
        window.open("https://web.whatsapp.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening WhatsApp by 1 second
    }
    else if (command.includes("open") && command.includes("snapchat")) {
      speak("Opening Snapchat");
      setResponse(true);
      setPrompt("Opening Snapchat...");
      
      setTimeout(() => {
        window.open("https://www.snapchat.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Snapchat by 1 second
    }
    else if (command.includes("open") && command.includes("pinterest")) {
      speak("Opening Pinterest");
      setResponse(true);
      setPrompt("Opening Pinterest...");
      
      setTimeout(() => {
        window.open("https://www.pinterest.com", "_blank");
        setSpeaking(false);
      }, 1000); // Delay opening Pinterest by 1 second
    } else {
      aiResponse(command);
    }
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
