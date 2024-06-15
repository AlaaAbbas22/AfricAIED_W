import MultiStep from "react-multistep";
import { useState, useEffect } from "react";
import round4 from "../assets/True-And-False.png"
import round1 from "../assets/round1.png"
import round2 from "../assets/round2.png"
import round3 from "../assets/round3.png"
import round5 from "../assets/round5.webp"
import Round1 from "./rounds/round1";
import http from "./http"
import Round2 from "./rounds/round2";
import Round3 from "./rounds/round3";
import Round4 from "./rounds/round4";
import Round5 from "./rounds/round5";

function Round({baseURL}){
    const [round, setRound] = useState("")
    const [start, setStart] = useState(false)
    const [stage, setStage] = useState("")
    
    function RoundChooser(){
        
        return (<div className=" h-[50vh]">
            <div className="text-center pt-3">
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


    const fetchRound = async () => {
        
        try {
          const response = await http.post(`${baseURL}/get_round`, {
            round: round,
          });
    
          if (response.data.authenticated === false) {
            alert('User not authenticated');
            return;
          }
    
          
          
          console.log(response.data.Questions);
          return response.data.Questions;
        } catch (err) {
          console.error('Error fetching question:', err);
          
        }
      };

    useEffect( () => {
        console.log("here ");
        const temp = async ()=>{
            const ques = await fetchRound()
            if(start){switch (round) {
                case 'round_1':
                  setStage(<Round1 baseURL={baseURL} questions={ques} />);
                  break;
                case 'round_2':
                  setStage(<Round2 baseURL={baseURL} questions={ques} />);
                  break;
                case 'round_3':
                  setStage(<Round3 baseURL={baseURL} questions={ques} />);
                  break;
                case 'round_4':
                  setStage(<Round4 baseURL={baseURL} questions={ques} />);
                  break;
                case 'round_5':
                    setStage(<Round5 baseURL={baseURL} questions={ques} />);
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
                
                {!start&&<div><h1 className="pt-3">
                    Practicing by round
                </h1>
                        <RoundChooser />

                    {(round)&&<button className="bg-green-500 hover:bg-green-400" onClick={()=>setStart(true)}>Goooo!</button>}
                </div>||
                stage}
            </div>
    </>)
}

export default Round