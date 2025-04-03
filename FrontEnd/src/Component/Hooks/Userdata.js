import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function  Userdata()
{
  // console.log("hello")
  const [data,setData] = useState()
  // console.log(data)
  const navigator = useNavigate()
    axios.get('http://localhost:4000/header',{withCredentials:true})
    .then((response)=>
      {
        setData(response.data)
      }
      )
    .catch((err)=>{navigator('/');console.log(err)})
    return data
}

