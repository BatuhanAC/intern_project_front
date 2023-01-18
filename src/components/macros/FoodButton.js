import React from 'react'

const FoodButton = ({index, chosenFoods, food, setAmountPage, setHoveredFood}) => {
  return (
    <>
      <button 
        key={index}
        className='w-fit p-2 h-min ml-[1%] cursor-pointer border-2 border-black bg-white rounded-3xl shadow-md shadow-black hover:border-white hover:bg-black hover:shadow-white hover:text-white'
        onClick={() => {
          if(chosenFoods.findIndex((arg) => arg.name === food.name) === -1){
            setAmountPage(food.name)
          }
        }}
        onMouseOver = {() => {
          setHoveredFood(food)
        }}
        onMouseOut = {() => {
          setHoveredFood({})
        }}
        >
        {food.name}
      </button> 
    </>
  )
}

export default FoodButton