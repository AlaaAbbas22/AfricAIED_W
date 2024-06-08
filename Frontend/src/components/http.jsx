import axios from "axios";
//headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
export default axios.create({withCredentials: true,});