import { useState } from "react";
import http from './http';
import { Link } from "react-router-dom";

function Dashboard({baseURL}) {    

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


    
    return (
      <div className="bg-white p-10">
        <h1>Welcome to your Dashboard!</h1>
        <Link className="sign-up-button m-2" to="/practice_question">
          <button>
            Practice by question
          </button>
        </Link>
        <Link className="sign-up-button m-2" to="/practice_round">
          <button>
            Practice by round
          </button>
        </Link>
      </div>
    )
  }

export default Dashboard