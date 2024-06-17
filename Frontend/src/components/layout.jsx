import { Link, Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import http from "./http";



function Layout({baseURL}){


    async function logout(){
        await http.post(`${baseURL}/logout`, {});
        localStorage.setItem("logged", "false")
        window.location.replace("/login");
      }

    return (localStorage.getItem("logged")=="true"&&<div className="pt-7 mt-[15vh]">
    <div className=" fixed top-0 left-[50%] mt-5 ml-[-230px] grid grid-cols-3">
        <div className='sign-up-button'>
            <button style={{backgroundColor:"#f00"}} onClick={logout}>
                Log out
            </button>
        </div>
        <Link className='sign-up-button' to="/">
            <button>
                Dashboard
            </button>
        </Link>
        <Link className='sign-up-button' to="/report">
            <button>
                Report/History
            </button>
        </Link>
    </div>
    
    <Outlet/>
  </div>||<Navigate replace to="/login" />)
}

export default Layout