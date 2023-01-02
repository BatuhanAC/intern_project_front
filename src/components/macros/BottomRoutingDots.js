import React from 'react'
import Cookies from "universal-cookie"
import { NavLink } from "react-router-dom";
import {GiMuscleUp, GiShinyApple} from "react-icons/gi"
import {BiPhotoAlbum} from 'react-icons/bi'
import {RiLogoutCircleLine} from 'react-icons/ri'
function BottomRoutingDots() {
  const cookie = new Cookies()

  const logout = () => {
    if (localStorage.getItem("isLogged") !== "false") {
      cookie.remove("jwt_auth")
      localStorage.setItem("isLogged", false)
      }
    }

  return (
    <div className="absolute bottom-4 grid grid-flow-col grid-rows-1 lg:mt-4 gap-2">
        <NavLink className="flex w-[75px] h-[75px] shadow-lg shadow-emerald-500 bg-emerald-500  rounded-full self-center right-0 items-center justify-center"
      to={"/progress"}>
        <GiMuscleUp size={45} />
      </NavLink>

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-white bg-white text-black rounded-full self-center right-[10%] bottom-[12%] items-center justify-center' 
      to={"/diet"}>
        <GiShinyApple size={42}/>
      </NavLink>

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-violet-500 bg-violet-500 rounded-full self-center left-[10%] bottom-[12%] items-center justify-center'
      to={"/photos"}>
        <BiPhotoAlbum size={40}/>
      </NavLink>

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-red-500 bg-red-500 rounded-full self-center bottom-0 items-center justify-center '
      to={"/"}
      onClick ={()=>{
        logout()
      }}
      >
        <RiLogoutCircleLine size={40}/>
      </NavLink>  
    </div>
  )
}

export default BottomRoutingDots