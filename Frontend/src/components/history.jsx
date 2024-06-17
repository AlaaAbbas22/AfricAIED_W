import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from './http'
import Latex from 'react-latex'

function History({baseURL}) {
    const [ rounds, setRounds ] = useState([])
    const [ questions, setQuestions ] = useState([])
    const [loading, setLoading]= useState(true)
    
    useEffect(()=>{
        http.get(`${baseURL}/fetch_history`).then((response)=>{
            setRounds(response.data.rounds);
            setQuestions(response.data.questions);
            setLoading(false);
        });
    }, []);

    return (
    !loading&&<div className="bg-white p-10 mx-auto">
        <h1 className=' font-serif'>History! <Link to="/report/recommend" className=' text-blue-700 hover:underline'>See recommendations.</Link></h1>
        <h2 className='font-bold text-center m-5'>Rounds</h2>
        <ul style={{listStyleType: 'disc'}}>
            {rounds.length==0&&
            <li >No history of rounds.</li>||
            rounds.map((item)=>{
                console.log(item)
                return <li className='ring ring-sky-600 p-2 rounded-xl bg-slate-300'>
                <div className='font-bold'>Round:</div><span className=' '>{item["round"]}</span>
                
                <div className='font-bold'>No. questions:</div><div className=' '>{item["questions"]}</div>
                <div className='font-bold'>Score:</div><div className=' '>{item["score"]}</div>
                
                <br></br><br></br>
                </li>
            })}
        </ul>
        <h2 className='font-bold text-center m-5'>Questions history</h2>
        <ul style={{listStyleType: 'disc'}} className='w-[40vw] '>
            {questions.length==0&&
            <li >No history of questions.</li>||
            questions.map((item)=>{
                return <li className='ring ring-sky-600 p-2 rounded-xl bg-slate-300 my-3'>
                    <div className='font-bold'>Round:</div><span className=' '>{item["round"]}</span><div className='font-bold'>Subject:</div><div className=' '>{item["subject"]}</div>
                    <div className='font-bold'>Question:</div><Latex className=' '>{item["question"]}</Latex>
                    <div className='font-bold'>Your Answer:</div><Latex className=' '>{item["answer"]}</Latex>
                    <div className='font-bold'>Model Answer:</div><Latex className=' '>{item["model"]}</Latex>
                    <div className='font-bold'>Score:</div><Latex className=' '>{item["score"]==0&&"Incorrect"||"Correct"}</Latex>
                    <br></br><br></br>
                    </li>
            })}
        </ul>
    </div>||<div>Loading...</div>
    )
  }

export default History
