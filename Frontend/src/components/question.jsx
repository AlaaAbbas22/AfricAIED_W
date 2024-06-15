import MultiStep from "react-multistep";
import { useState, useEffect } from "react";
import bio from "../assets/bio.png"
import random from "../assets/random.png"
import math from "../assets/math.png"
import chem from "../assets/chempng.png"
import phy from "../assets/phy.png"
import round4 from "../assets/True-And-False.png"
import round1 from "../assets/round1.png"
import round2 from "../assets/round2.png"
import round3 from "../assets/round3.png"
import round5 from "../assets/round5.webp"
import QuestionSimulationRound1 from "./question_simulation1";
import http from "./http"
import QuestionSimulationRound2 from "./question_simulation2";
import QuestionSimulationRound4 from "./question_simulation4";
import QuestionSimulationRound3 from "./question_simulation3";
import QuestionSimulationRound5 from "./question_simulation5";

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



function Question({baseURL}){
    const [subject, setSubject] = useState("")
    const [round, setRound] = useState("")
    const [start, setStart] = useState(false)
    const [stage, setStage] = useState(null)
    const [questionId, setQuestionId] = useState(null);
    const [question, setQuestion] = useState(null);

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

    const fetchRandomQuestion = async () => {
        
        try {
          const response = await http.post(`${baseURL}/get_random_question`, {
            subject: subject,  
            round: round,
          });
    
          if (response.data.authenticated === false) {
            alert('User not authenticated');
            return;
          }
    
          
          
          console.log(response.data.Question);
          if(round!="round_5"){tts(convertLatexToReadableText(response.data.Question));}
          return [response.data.id, response.data.Question];
        } catch (err) {
          console.error('Error fetching question:', err);
          
        }
      };

    function SubjectChooser(){
        return (<div className=" h-[40vh]">
            <div className="text-center">
                <div className="grid grid-cols-3 place-items-center my-10">
                    <div className={`cursor-pointer p-2 ${subject=="Mathematics"&&"ring bg-slate-300"}`} onClick={()=>setSubject("Mathematics")}>
                        Math
                        <img src={math} className="h-[50px]"/>
                    </div>

                    <div className={`cursor-pointer p-2 ${subject=="Chemistry"&&"ring bg-slate-300"}`} onClick={()=>setSubject("Chemistry")}>
                        Chemistry
                        <img src={chem} className="h-[50px]"/>
                    </div>
                    <div className={`cursor-pointer p-2 ${subject=="Physics"&&"ring bg-slate-300"}`} onClick={()=>setSubject("Physics")}>
                        Physics
                        <img src={phy} className="h-[50px]"/>
                    </div>

                    
                </div>
                <div className="grid grid-cols-2 place-items-center w-[66%] mx-auto">
                    <div className={`cursor-pointer p-2 ${subject=="Biology"&&"ring bg-slate-300"}`} onClick={()=>setSubject("Biology")}>
                        Biology
                        <img src={bio} className="h-[50px]"/>
                    </div>
                    <div className={`cursor-pointer p-2 ${subject=="random"&&"ring bg-slate-300"}`} onClick={()=>setSubject("random")}>
                        Random
                        <img src={random} className="h-[50px]"/>
                    </div>
                </div>
            </div>
        </div>);
    };

    function RoundChooser(props){
        
        return (<div className=" h-[40vh]">
            <div className="text-center">
                <div className="grid grid-cols-3 place-items-center my-10 ">
                    <div className={`cursor-pointer p-2 ${round=="round_1"&&"ring bg-slate-300"}`} onClick={()=>setRound("round_1")}>
                        Round 1
                        <img src={round1} className="h-[50px]"/>
                    </div>

                    <div className={`cursor-pointer p-2 ${round=="round_2"&&"ring bg-slate-300"}`} onClick={()=>setRound("round_2")}>
                        Round 2
                        <img src={round2} className="h-[50px]"/>
                    </div>
                    <div className={`cursor-pointer p-2 ${round=="round_3"&&"ring bg-slate-300"}`} onClick={()=>setRound("round_3")}>
                        Round 3
                        <img src={round3} className="h-[50px]"/>
                    </div>

                    
                </div>
                <div className="grid grid-cols-2 place-items-center w-[66%] mx-auto">
                    <div className={`cursor-pointer p-2 ${round=="round_4"&&"ring bg-slate-300"}`} onClick={()=>setRound("round_4")}>
                        <div className="mx-auto"> Round 4</div>
                        <img src={round4} className="h-[50px]"/>
                    </div>
                    <div className={`cursor-pointer p-2 ${round=="round_5"&&"ring bg-slate-300"}`} onClick={()=>setRound("round_5")}>
                        Round 5
                        <img src={round5} className="h-[50px]"/>
                    </div>
                </div>
            </div>
        </div>);
    };


    const steps = [
        { name: "Choose Round", component: <RoundChooser /> },
        { name: "Choose Subject", component: <SubjectChooser /> },
    
      ];


      useEffect( () => {
        console.log("here ");
        const temp = async ()=>{
            const ques = await fetchRandomQuestion()
            if(start){switch (round) {
                case 'round_1':
                  setStage(<QuestionSimulationRound1 baseURL={baseURL} question={ques[1]} questionId={ques[0]} sub={subject}/>);
                  break;
                case 'round_2':
                  setStage(<QuestionSimulationRound2 baseURL={baseURL} question={ques[1]} questionId={ques[0]} sub={subject}/>);
                  break;
                case 'round_3':
                  setStage(<QuestionSimulationRound3 baseURL={baseURL} question={ques[1]} questionId={ques[0]} sub={subject}/>);
                  break;
                case 'round_4':
                  setStage(<QuestionSimulationRound4 baseURL={baseURL} question={ques[1]} questionId={ques[0]} sub={subject}/>);
                  break;
                case 'round_5':
                    setStage(<QuestionSimulationRound5 baseURL={baseURL} question={ques[1]} questionId={ques[0]} sub={subject}/>);
                    break;
                default:
                  setStage(null);
                  break;
              }}    
        } 
        temp()
        
      }, [start]);


    return (<>
            <div className="bg-white w-[70vh]">
                
                {(!start)&&<div>
                    <h1 className="pt-3">
                    Practicing by question
                </h1>
                    <MultiStep showTitles={false} className="bg-black" >
                        <RoundChooser />
                        <SubjectChooser />
                    </MultiStep>

                    
                    {(subject&&round)&&<button className="bg-green-500 hover:bg-green-400" onClick={()=>setStart(true)}>Goooo!</button>}
                </div>||
                stage}
            </div>
    </>)
}


export default Question
