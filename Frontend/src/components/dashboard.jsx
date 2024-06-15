import { useState } from "react";
import http from './http';
import { Link } from "react-router-dom";

function Dashboard({baseURL}) {    

    


    
    return (
      <div className="bg-white p-10">
        <h1>Welcome to your Dashboard!</h1>
        <Link className="sign-up-button m-2" to="/practice_question">
          <button>
            Practice by question
          </button>
        </Link>
        <Link className="sign-up-button m-2" to="/practice_round">
          <button>
            Practice by round
          </button>
        </Link>
      </div>
    )
  }

export default Dashboard