import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
  Navigate
  } from "react-router-dom";

import http from './components/http';

import Test from './components/temp';
import LoginForm from './components/login';

const baseURL = "http://127.0.0.1:8000"


async function logout(){
  await http.post(`${baseURL}/logout`, {});
  localStorage.setItem("logged", "false")
  window.location.replace("/login");
}



const router = createBrowserRouter([
  {
    path: "/",
    element: (localStorage.getItem("logged")=="true"&&<>
      <button style={{backgroundColor:"#f00"}} onClick={logout}>Log out</button>
      <Test baseURL={baseURL}/>
    </>||<Navigate replace to="/login" />),
  },
  {
    path: "/login",
    element: <LoginForm baseURL={baseURL}/>
  }
]);


function App() {
  useEffect(()=>{
      http.get(`${baseURL}/authenticate`).then((response)=>{
      if (response.data.authenticated){
        localStorage.setItem("logged", "true")
      } else {
        localStorage.setItem("logged", "false")
      }
    })

  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
