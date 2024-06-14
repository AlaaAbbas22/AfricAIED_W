import MultiStep from "react-multistep";
import { useState } from "react";
import round4 from "../assets/True-And-False.png"
import round1 from "../assets/round1.png"
import round2 from "../assets/round2.png"
import round3 from "../assets/round3.png"
import round5 from "../assets/round5.webp"

function Round(baseURL){
    const [round, setRound] = useState("")
    const [start, setStart] = useState(false)

    
    function RoundChooser(){
        
        return (<div className=" h-[50vh]">
            <div className="text-center pt-3">
                <div className="grid grid-cols-3 place-items-center my-10 ">
                    <div className={`cursor-pointer p-2 ${round=="round_1"&&"ring"}`} onClick={()=>setRound("round_1")}>
                        Round 1
                        <img src={round1} className="h-[50px]"/>
                    </div>

                    <div className={`cursor-pointer p-2 ${round=="round_2"&&"ring"}`} onClick={()=>setRound("round_2")}>
                        Round 2
                        <img src={round2} className="h-[50px]"/>
                    </div>
                    <div className={`cursor-pointer p-2 ${round=="round_3"&&"ring"}`} onClick={()=>setRound("round_3")}>
                        Round 3
                        <img src={round3} className="h-[50px]"/>
                    </div>

                    
                </div>
                <div className="grid grid-cols-2 place-items-center w-[66%] mx-auto">
                    <div className={`cursor-pointer p-2 ${round=="round_4"&&"ring"}`} onClick={()=>setRound("round_4")}>
                        <div className="mx-auto"> Round 4</div>
                        <img src={round4} className="h-[50px]"/>
                    </div>
                    <div className={`cursor-pointer p-2 ${round=="round_5"&&"ring"}`} onClick={()=>setRound("round_5")}>
                        Round 5
                        <img src={round5} className="h-[50px]"/>
                    </div>
                </div>
            </div>
        </div>);
    };






    return (<>
            <div className="bg-white w-[70vh]">
                <h1 className="pt-3">
                    Practicing by round
                </h1>
                {!start&&<div>
                        <RoundChooser />

                    {(round)&&<button className="bg-green-500 hover:bg-green-400" onClick={()=>setStart(true)}>Goooo!</button>}
                </div>||
                <div>
                    The part of the simulation of the competition (to be completed)
                </div>}
            </div>
    </>)
}

export default Round