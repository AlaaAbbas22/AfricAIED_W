import { useState } from "react";
import http from './http';

function Test({baseURL}) {
    const [input, setInput] = useState("")
    

    // function for fetching the backend for tts
    function tts(text){
      http.post(`${baseURL}/tts`, {text}, { responseType: 'blob' }).then((response)=>{
            
        // Create an object URL for the Blob
        const audioUrl = URL.createObjectURL(response.data);

        // Create an audio object and play it
        const audio = new Audio(audioUrl);
        
        audio.play();

      })
    }


    function handleSubmit(){
      try{
        tts(input)
      } catch(err) {
        console.log(err)
      }
    }
    return (
      <>
        <div>
          <a/>
          <a href="https://react.dev" target="_blank">
            <img src={""} className="logo react" alt="React logo" />
          </a>
        </div>

        <div style={{marginTop:"20px"}}> 
          <input value={input} placeholder="Enter text here..." style={{fontSize:25}} onChange={(e)=>setInput(e.target.value)}></input>
        </div>
        <div className="card">
          <button onClick={handleSubmit}>
            Convert text to speech
          </button>
        </div>
        <p className="read-the-docs">
          Click on the React logo to learn more
        </p>
      </>
    )
  }

export default Test