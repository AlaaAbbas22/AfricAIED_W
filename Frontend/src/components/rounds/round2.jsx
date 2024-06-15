import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import QuestionSimulationRound2 from "../question_simulation2"
import http from "../http";

const convertLatexToReadableText = (latex) => {
    // Handle fractions, superscripts, subscripts, square roots, binomial coefficients, matrices, etc.
    let text = latex.replace(/\\[a-zA-Z]+\{[^}]*\}/g, '');
  
    // Replace common LaTeX symbols
    const replacements = {
      // Your existing replacements here...
    };
  
    for (const [latexSymbol, word] of Object.entries(replacements)) {
      const regex = new RegExp(latexSymbol, 'g');
      text = text.replace(regex, word);
    }
  
    // Handle inline math mode ($...$) and display math mode ($$...$$)
    text = text.replace(/\$([^$]+)\$/g, ' $1 ');
    text = text.replace(/\$\$([^$]+)\$\$/g, ' $1 ');
  
    // Handle mathematical operators
    const operators = {
      '+': ' plus ',
      '-': ' minus ',
      '*': ' times ',
      '/': ' divided by ',
      '=': ' equals ',
      '<': ' less than ',
      '>': ' greater than ',
      '(': ' left parenthesis ',
      ')': ' right parenthesis ',
      '[': ' left bracket ',
      ']': ' right bracket ',
      '{': ' left brace ',
      '}': ' right brace ',
      '^': ' to the power of ',
      '_': ' sub ',
      '%': ' percent ',
      '&': ' and ',
      '#': ' number ',
      '$': ' dollar ',
      '!': ' factorial '
    };
  
    for (const [symbol, word] of Object.entries(operators)) {
      const regex = new RegExp(`(?<=\\$\\$|\\$)\\${symbol}(?=\\$\\$|\\$)`, 'g');
      text = text.replace(regex, word);
    }
  
    // Remove any remaining LaTeX commands and extra spaces
    text = text.replace(/\\[a-zA-Z]+\s?/g, '').replace(/\s+/g, ' ').trim();
  
    return text;
  };

function Round2({baseURL, questions}){
    const [nextValid, setNextValid] = useState(false)
    const [ index, setIndex] = useState(0)
    const [ score, setScore ] = useState(0)
    const [ current, setCurrent ] = useState("")



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

    useEffect(()=>{
        (index < questions.length&&tts(convertLatexToReadableText(questions[index]["Question"])))
       setCurrent(index < questions.length&&<QuestionSimulationRound2 question={questions[index]["Question"]} baseURL={baseURL} sub={questions[index]["Subject"]} questionId={questions[index]["id"]} title={false} next={setNextValid} scoring={setScore} key={index}/>|| "")
    },[index])
    return (index < questions.length&&<div className="p-5">
        <h1>Practice Round 2, Question No. {index+1} out of {questions.length}, Score: {score}</h1>
        {current}

        {index < questions.length && nextValid && <button onClick={()=>{setIndex((cur)=>cur+1); setNextValid(false)}}>Next Question</button>}
    </div>||<div className="p-5">
        <h1>Result: Practice Round 2</h1>
        <ul className=" text-center">
            <li>Question No.: {questions.length}</li>
            <li>Score: {score}</li>
        </ul>
        <Link to="/">
            <button>
                Home
            </button>
        </Link>
    </div>)
}

export default Round2