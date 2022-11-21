import React from 'react'
import { NavLink } from "react-router-dom";
import {IoPersonOutline} from "react-icons/io5"
import {GiMuscleUp, GiFat, GiShinyApple} from "react-icons/gi"
import {BiPhotoAlbum} from 'react-icons/bi'
import {MdCalculate} from  'react-icons/md'
import {BsCalculator} from 'react-icons/bs'
import {RiLogoutCircleLine} from 'react-icons/ri'
function ListOfRoutingDots() {

  const logout = () => {
    if (localStorage.getItem("isLogged") !== "false") {
      localStorage.setItem("isLogged", false)
      }
    }

  return (
    <>

      <NavLink className="flex absolute w-[75px] h-[75px] shadow-lg shadow-emerald-500 bg-emerald-500  rounded-full self-center right-0 items-center justify-center"
      to={"/progress"}>
        <GiMuscleUp size={45} />
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-white bg-white text-black rounded-full self-center right-[10%] bottom-[12%] items-center justify-center' 
      to={"/diet"}>
        <GiShinyApple size={42}/>
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-black bg-black text-white rounded-full self-center right-[10%] top-[12%] items-center justify-center'
      to={"/bmi"}>
        <MdCalculate size={35}/>
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-pink-500 bg-pink-500 rounded-full self-center left-0 items-center justify-center'
      to={"/calorie-calculator"}>
        <BsCalculator size={42}/>
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-violet-500 bg-violet-500 rounded-full self-center left-[10%] bottom-[12%] items-center justify-center'
      to={"/photos"}>
        <BiPhotoAlbum size={40}/>
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-teal-400 bg-teal-400 rounded-full self-center left-[10%] top-[12%] items-center justify-center'
      to={"/fat-percentage"}>
        <GiFat size={45}/>
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-yellow-500 bg-yellow-500 rounded-full self-center top-0 items-center justify-center'
      to={"/account"}>
        <IoPersonOutline size={40} />
      </NavLink>

      <NavLink className='flex absolute w-[75px] h-[75px] shadow-lg shadow-red-500 bg-red-500 rounded-full self-center bottom-0 items-center justify-center '
      to={"/"}
      onClick ={()=>{
        logout()
      }}
      >
        <RiLogoutCircleLine size={40}/>
      </NavLink>
    
    </>
  )
}

export default ListOfRoutingDots