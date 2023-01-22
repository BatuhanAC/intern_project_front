import React from 'react'
import { NavLink } from "react-router-dom";
import {IoPersonOutline} from "react-icons/io5"
import {GiFat} from "react-icons/gi"
import {MdCalculate} from  'react-icons/md'
import {BsCalculator} from 'react-icons/bs'
function TopRoutingDots() {

  return (
    <div className="flex flex-row lg:mb-4 mb-2 mt-1 gap-2">

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-yellow-500 bg-yellow-500 rounded-full self-center top-0 items-center justify-center'
      to={"/account"}>
        <IoPersonOutline size={40} />
      </NavLink>

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-black bg-black text-white rounded-full self-center right-[10%] top-[12%] items-center justify-center'
      to={"/bmi"}>
        <MdCalculate size={35}/>
      </NavLink>

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-pink-500 bg-pink-500 rounded-full self-center left-0 items-center justify-center'
      to={"/calorie-calculator"}>
        <BsCalculator size={42}/>
      </NavLink>

      <NavLink className='flex w-[75px] h-[75px] shadow-lg shadow-teal-400 bg-teal-400 rounded-full self-center left-[10%] top-[12%] items-center justify-center'
      to={"/fat-percentage"}>
        <GiFat size={45}/>
      </NavLink>

    </div>
  )
}

export default TopRoutingDots