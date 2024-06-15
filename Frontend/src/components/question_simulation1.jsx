import React, {useState, useEffect} from 'react'
import http from "./http"
import Latex from "react-latex"
import tts from "./question"




const QuestionSimulationRound1 = ({baseURL, question, questionId, sub}) => {
  

  
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [ model, setModel ]=  useState("");
  const [answered, setAnswered] = useState(false);

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

    
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        setAnswered(true);
        try {
          const response = await http.post(`${baseURL}/grade`, {
            round: "round_1",   // Assuming round 1
            id: questionId,
            answer: answer
          });
          
          if (response.data.authenticated === false) {
            setError('User not authenticated');
            return;
          }
          tts(response.data.result ? 'Correct' : 'Incorrect')
          setResult(response.data.result ? 'Correct' : 'Incorrect');
          
          if (response.data.model){
            setModel(response.data.model)
          };
        } catch (err) {
          console.error('Error grading answer:', err);
          setError('Error grading answer');
        }
      };

      
  return (
    <div>
      {true ? (
        <div className='p-5'>
          <h1>Practicing round 1, subject {sub}</h1>
          <p><strong>Question:</strong> <Latex>{question}</Latex></p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer"
              required
              disabled={answered}
              className='p-3 text-center m-2 font-sans border'
            />
            <button type="submit">Submit Answer</button>
          </form>
          {result && <p><strong>Result:</strong> {result}</p>}
          {model && <p><strong>Model Answer:</strong><br></br> <Latex>{model}</Latex></p>}
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  )
}

export default QuestionSimulationRound1