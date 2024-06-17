import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";

import http from './components/http';

import LoginForm from './components/login';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';
import Layout from './components/layout';
import Question from './components/question';
import Round from './components/round';
import History from './components/history';
import Recommend from './components/recommend';

const baseURL = "http://127.0.0.1:8000";






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout baseURL={baseURL}/>,
    children: [
      {
        path: "/",
        element:<Dashboard baseURL={baseURL}/>,
      },
      {
        path: "/practice_question",
        element:<Question baseURL={baseURL}/>,
      },
      {
        path: "/practice_round",
        element:<Round baseURL={baseURL}/>,
      },
      {
        path: "/report",
        element:<History baseURL={baseURL}/>,
      },
      {
        path: "/report/recommend",
        element:<Recommend baseURL={baseURL}/>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm baseURL={baseURL}/>,
  },
  {
    path: "/signup",
    element: <SignUp baseURL={baseURL}/>,
  }
]);


function App() {
  useEffect(()=>{
    
      http.get(`${baseURL}/authenticate`).then((response)=>{
      if (response.data.authenticated){
        localStorage.setItem("logged", "true");
      } else {
        localStorage.setItem("logged", "false");
      }
    });

  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App
