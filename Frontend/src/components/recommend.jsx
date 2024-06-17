import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from './http'
import Latex from 'react-latex'
import MarkDown  from "react-markdown"
import {TailSpin} from "react-loader-spinner"
import Typist from 'react-typist';


function Recommend({baseURL}) {
    const [ result, setresult ] = useState("")
    const [ loading, setLoading ] = useState("Yes")

    useEffect(()=>{
        setLoading("Yes")
        http.get(`${baseURL}/recommend`).then((response)=>{
            
            setresult(response.data.result)
            console.log(response.data.result)
            setLoading("No")
        });
    }, []);

    return (
    loading!="Yes"&&<div className="bg-white p-10 mx-auto w-2/4">
        <h1 className=' font-serif'>Recommendations for improvement!</h1>
        <div className=' min-w-full'>
        <Typist>
        <MarkDown className="text-left">{result}</MarkDown>
      </Typist>
            
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

export default Recommend
