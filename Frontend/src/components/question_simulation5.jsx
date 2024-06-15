import React, { useState, useEffect } from 'react';
import http from './http';
import Latex from 'react-latex';

const QuestionSimulationRound5 = ({ baseURL, question, questionId, sub, title=true, next = (e)=>{}, scoring = (e)=>{} }) => {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [model, setModel] = useState('');
  const [answered, setAnswered] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Increment the clue index after 30 seconds
      if (clueIndex < question.length - 1) {
        setClueIndex(clueIndex + 1);
      }
    }, 30000);

    if (clueIndex>=question.length - 1){
        handleSubmit("");
        setAnswered(true);
    }

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [clueIndex, question]);

  const handleSubmit = async (e) => {
    try{e.preventDefault();}
    catch(e){}

    try {
      const response = await http.post(`${baseURL}/grade`, {
        round: 'round_5', // Assuming round 5
        id: questionId,
        answer: answer,
      });

      if (response.data.authenticated === false) {
        setError('User not authenticated');
        return;
      }

      setResult(response.data.result ? 'Correct' : 'Incorrect');
      if (response.data.result){
        scoring((e)=>e+1);
        setAnswered(true);
      };
      if (response.data.model) {
        setModel(response.data.model);
      }
    } catch (err) {
      console.error('Error grading answer:', err);
      setError('Error grading answer');
    };
    next(true);
  };

  return (
    <div>
      {true ? (
        <div className="p-5">
          {title&&<h1>Practicing round 5, subject {sub}</h1>}
          
            <strong>Clues:</strong>{' '}
            <ol style={{listStyle:"revert"}} className='px-4'>
              {question.slice(0, clueIndex + 1).map((clue, index) => (
                <li key={index}>{clue}<br></br></li>
              ))}
            </ol>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer"
              required
              disabled={answered}
              className="p-3 text-center m-2 font-sans border"
            />
            <button disabled={answered} type="submit">Submit Answer</button>
          </form>
          {result && (
            <p>
              <strong>Result:</strong> {result}
            </p>
          )}
          {answered && (
            <p>
              <strong>Model Answer:</strong>
              <br />
              <div>{model}</div>
            </p>
          )}
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default QuestionSimulationRound5;
