import { Link, Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import http from "./http";



function Layout({baseURL}){


    async function logout(){
        await http.post(`${baseURL}/logout`, {});
        localStorage.setItem("logged", "false")
        window.location.replace("/login");
      }

    return (localStorage.getItem("logged")=="true"&&<>
    <div className=" fixed top-0 left-[50%] mt-5 ml-[-130px] grid grid-cols-2">
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
    </div>
    
    <Outlet/>
  </>||<Navigate replace to="/login" />)
}

export default Layout