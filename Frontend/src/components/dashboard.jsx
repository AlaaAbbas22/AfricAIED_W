import { useState, useEffect } from "react";
import http from './http';
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
function Dashboard({baseURL}) {    
    const [ rounds, setRounds ] = useState([])
    const [ questions, setQuestions ] = useState([])
    const [loading, setLoading]= useState("Yes")

  useEffect(()=>{
    http.get(`${baseURL}/fetch_history`).then((response)=>{
        setRounds(response.data.rounds.slice(0, 5));
        setQuestions(response.data.questions.slice(0, 5));
        setLoading("No");
    });
}, []);


    
    return (
      loading=="No"&&<div className="bg-white p-10">
        <h1>Welcome to your Dashboard!</h1>
        <div className="grid grid-cols-2 gap-3">
          <div>
          <Link className="sign-up-button m-2" to="/practice_question">
              <button>
                Practice by question
              </button>
            </Link>
          <h2 className=" text-center font-extrabold">Recent Questions</h2>
            <div className='ring ring-sky-600 p-2 rounded-xl bg-slate-300'>
              
            {rounds.length==0&&
            <li >No history of questions.</li>||
            questions.map((item)=>{
                
                return <li >
                <span className='font-bold'>Round:</span><span className=' '> {item["round"].charAt(6)}</span>
                
                <div><span className='font-bold'>Subject:</span><span className=' '> {item["subject"]}</span></div>
                <div><span className='font-bold'>Score:</span><span className=' '> {item["score"]}</span></div>
                
                
                </li>
            })}
            </div>
            
          </div>
          <div>
          <div>
          <Link className="sign-up-button m-2" to="/practice_round">
            <button>
              Practice by round
            </button>
          </Link> 
          <h2 className=" text-center font-extrabold">Recent Rounds</h2>
            {rounds.length==0&&
            <li >No history of rounds.</li>||
            rounds.map((item)=>{
                console.log(item)
                return <li className='ring ring-sky-600 p-2 rounded-xl bg-slate-300'>
                <span className='font-bold'>Round:</span><span className=' '> {item["round"].charAt(6)}</span>,
                
                <div><span className='font-bold'>No. questions:</span><span className=' '>{item["questions"]}</span></div>
                <div><span className='font-bold'>Score:</span><span className=' '>{item["score"]}</span></div>
                
                <br></br>
                </li>
            })}
            </div>
          
          </div>
        </div>
      </div>||
    <div className="m-auto my-20 w-40"><TailSpin
    height="140"
    width="140"
    color="#5555ff"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
/></div>
    )
  }

export default Dashboard