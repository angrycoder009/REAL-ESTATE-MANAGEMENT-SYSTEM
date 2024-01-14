import React, { useEffect, useState } from 'react'
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useLocation , useNavigate} from 'react-router-dom'
export default function Header() {
  const[pageState,setPageState]=useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setPageState("Profile")
      } else{
        setPageState("Sign in")
      }
    })
  },[auth])
  function pathMathRoute(route){
    if(route === location.pathname){
      return true
    }
  }
  return (
    <div className='bg-white border-b shadow-white sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src ="https://i.pinimg.com/736x/1e/b8/ab/1eb8ab6b49ad617cfe91c462d963f310.jpg"alt="logo"  className='w-48 h-32 m-2 cursor-pointer' onClick={()=>navigate("/")}/>
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-blackb border-b-red-500"} `} onClick={()=>navigate("/")}>Home</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"} `}  onClick={()=>navigate("/offers")}>Offers</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${(pathMathRoute("/sign-in")||pathMathRoute("/profile")) && "text-black border-b-red-500"} `}  onClick={()=>navigate("/profile")}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  )
}
