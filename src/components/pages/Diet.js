import React, {useState, useEffect} from 'react'
import { foodProcess } from '../controller/apiController'
import Button from '../micros/Button'
import Input from '../micros/Input'
import Option from '../micros/Option'
import Cookies from "universal-cookie"
import HoveredFood from '../macros/HoveredFood'
import AmountPage from '../macros/AmountPage'
import FoodButton from '../macros/FoodButton'

const Diet = () => {
  const [cookie, setCookie] = useState(null)
  const [searchWord, setSearchWord] = useState("")
  const [filteredFoods, setfilteredFoods] = useState([])
  const [chosenFoods, setChosenFoods] = useState([])
  const [carbonhydrate, setCarbonhydrate] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0)  
  const [kcal, setKcal] = useState(0)
  const [newDietName, setNewDietName] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [hoveredFood, setHoveredFood] = useState({})
  const [amountPage, setAmountPage] = useState("")
  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState(0)
  const [mousePosition, setMousePosition] = useState({
    left: 0,
    top: 0
  })
  const [foods, setFoods] = useState([])
 
  const checkMouse = (e) => {
    setMousePosition({
      left: e.pageX,
      top: e.pageY
    })
  }
  
  useEffect(() => {
    setCookie(new Cookies())
    document.addEventListener('mousemove', checkMouse)
    return () => {
      document.removeEventListener('mousemove', checkMouse)
    }
  }, [])
  

  useEffect(() => {
    const newFilter = foods.filter((value) => {
      return value.name.toLocaleLowerCase("tr-TR").includes(searchWord.toLocaleLowerCase("tr-TR"))
    })
    setfilteredFoods([...newFilter])
  }, [searchWord, foods])  

  useEffect(() => {
    newDietName.trim() === "" ? setDisabled(true) : 
    foods.every((food) => food.name.trim().toLowerCase() !== newDietName.trim().toLowerCase()) ? setDisabled(false) : setDisabled(true)  
  }, [newDietName, foods])
  
  useEffect(() => {
    if(foods.length < 1 && cookie != null){
      foodProcess(cookie.get("jwt_auth"), foods, setFoods, "/getAllFood")
    }  
  }, [foods, cookie])
 
  return (
    <div className='flex flex-col lg:flex-row h-full w-full gap-3 text-black z-50 text-center font-medium'>
    {
      hoveredFood.name &&
      <HoveredFood mousePosition={mousePosition} hoveredFood={hoveredFood}/>
    }
      <div className='flex flex-col shadow-md shadow-black bg-slate-300 w-full lg:h-full h-[300px] rounded-3xl p-3'>
        <div>
          <Input type= {"search"} placeholder={"Aradığınız ürünü yazınız."} setState={setSearchWord} />
        </div>
          
        <div className='flex flex-wrap max-h-[300px] mt-[2%] p-[1%] overflow-y-auto justify-center  '>
          {
            searchWord === "" && (
              foods.map((food, index) => {
                return (
                  <div key={index} className="m-[1%]">
                    <FoodButton food={food} chosenFoods={chosenFoods} index={index} setAmountPage={setAmountPage} setHoveredFood={setHoveredFood} />
                    {
                      amountPage === food.name && (
                        <AmountPage  food={food} unit={unit} amount={amount} chosenFoods={chosenFoods} carbonhydrate={carbonhydrate} 
                              protein={protein} fat={fat} kcal={kcal} setUnit={setUnit} setAmount={setAmount} setChosenFoods={setChosenFoods} 
                              setCarbonhydrate={setCarbonhydrate} setProtein={setProtein} setFat={setFat} setKcal={setKcal} setAmountPage={setAmountPage} />
                        )
                      }
                    </div>
                  )
                })
              )
            }
            {
              searchWord !== "" && (
                filteredFoods.map((food, index) => {
                  return (
                    <div key={index} className="m-[1%]">
                      <FoodButton food={food} chosenFoods={chosenFoods} index={index} setAmountPage={setAmountPage} setHoveredFood={setHoveredFood} />
                      {
                        amountPage === food.name && (
                          <AmountPage  food={food} unit={unit} amount={amount} chosenFoods={chosenFoods} carbonhydrate={carbonhydrate} 
                              protein={protein} fat={fat} kcal={kcal} setUnit={setUnit} setAmount={setAmount} setChosenFoods={setChosenFoods} 
                              setCarbonhydrate={setCarbonhydrate} setProtein={setProtein} setFat={setFat} setKcal={setKcal} setAmountPage={setAmountPage} />
                        )
                      }
                    </div>
                  )
                })
              )
            }
          </div>    
        </div>
        <div className='flex flex-col shadow-md shadow-black bg-slate-200 w-full h-full rounded-3xl'>
          <div className='flex flex-wrap w-full max-h-[220px] mt-[2%] p-[1%] overflow-y-auto'>
          {
            chosenFoods.map((chosenOne, index) => {
              return (
                  <button 
                  key={index}
                  className='w-fit p-2 h-min ml-[1%] cursor-pointer border-2 border-black bg-white rounded-3xl shadow-md shadow-black hover:border-white hover:bg-black hover:shadow-white hover:text-white'
                  onClick={() => {
                    chosenFoods.splice(chosenFoods.findIndex((arg) => arg.name === chosenOne.name), 1)
                    setChosenFoods([...chosenFoods])
                    setCarbonhydrate(carbonhydrate-chosenOne.amount[0].carbonhydrate)
                    setProtein(protein-chosenOne.amount[0].protein)
                    setFat(fat-chosenOne.amount[0].fat)
                    setKcal(kcal-chosenOne.amount[0].calorie)
                    setHoveredFood({})
                  }}
                  onMouseOver = {() => {
                    setHoveredFood(chosenOne)
                  }}
                  onMouseOut = {() => {
                    setHoveredFood({})
                  }}
                >
                {chosenOne.name}
                </button>
              )
            })
          }
          </div>
          <div className='h-full w-full rounded-3xl bg-slate-50 flex items-center justify-center'>
            <div className='h-full w-full p-[2%] flex flex-row'>
                <table className='table-auto self-center min-w-max'>
                  <caption>Liste Toplamı</caption>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td>
                        Karbonhidrat:
                      </td>
                      <td >
                        {Math.abs(carbonhydrate.toFixed(2))} gr
                      </td>
                    </tr>
                    <tr>
                      <td className='text-end'>
                        Protein:
                      </td>
                      <td>
                        {Math.abs(protein.toFixed(2))} gr 
                      </td>
                    </tr>
                    <tr>
                      <td className='text-end'>
                        Yağ:
                      </td>
                      <td>
                        {Math.abs(fat.toFixed(2))} gr
                      </td>
                    </tr>
                    <tr>
                      <td className='text-end'>
                        Kalori:
                      </td>
                      <td >
                        {Math.abs(kcal.toFixed(2))} kcal
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='w-max ml-10 justify-center flex flex-col items-center'>
                  <div className='flex '>  
                      <input className='text-black border-2 p-3 w-full h-[25%] self-center border-blue-200 focus:border-blue-600 outline-none text-base text-center rounded-2xl'
                      placeholder="Listenize isim verin."
                      onChange={(e) => {
                        setNewDietName(e.target.value)
                      }}
                      />
                  </div>
                  <div className='flex w-max'>
                    <Button disabled={disabled} 
                    handleOnClick={() => {     
                       
                        foodProcess(
                          cookie.get("jwt_auth"), 
                          foods, 
                          setFoods, 
                          "/addFood", 
                          {
                            name: newDietName,
                            amount: [
                              {
                                name: "Belirlediğiniz",
                                carbonhydrate: carbonhydrate,
                                protein: protein,
                                fat: fat,
                                calorie: kcal
                              }
                            ] 
                          }
                        )   
                      }
                    }>Ekle</Button>
                  </div>
              </div>  
            </div>
          </div>
        </div>
    </div>
  )
}

export default Diet