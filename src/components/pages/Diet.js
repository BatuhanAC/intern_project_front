import React, {useState, useEffect} from 'react'
import Button from '../micros/Button'
import Input from '../micros/Input'
import Option from '../micros/Option'

const Diet = () => {
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
  
  const [foods, setFoods] = useState([
    {
      name: "yumurta",
      amount: [
        {
          name: "Küçük",
          carbonhydrate: 0.29,
          protein: 5.02,
          fat: 3.8,
          calorie: 57
        },
        {
          name: "Orta",
          carbonhydrate: 0.36,
          protein: 6.28,
          fat: 4.76,
          calorie: 72
        },
        {
          name: "Büyük",
          carbonhydrate: 0.43,
          protein: 7.54,
          fat: 5.71,
          calorie: 86
        },
        {
          name: "Gram",
          carbonhydrate: 0.01,
          protein: 0.13,
          fat: 0.1,
          calorie: 1
        },
        {
          name: "Su bardağı (200ml)",
          carbonhydrate: 1.37,
          protein: 23.86,
          fat: 18.07,
          calorie: 272
        }
      ],
    },
    {
      name: "yumurta2",
      amount: [
        {
          name: "Küçük",
          carbonhydrate: 0.29,
          protein: 5.02,
          fat: 3.8,
          calorie: 57
        },
        {
          name: "Orta",
          carbonhydrate: 0.36,
          protein: 6.28,
          fat: 4.76,
          calorie: 72
        },
        {
          name: "Büyük",
          carbonhydrate: 0.43,
          protein: 7.54,
          fat: 5.71,
          calorie: 86
        },
        {
          name: "Gram",
          carbonhydrate: 0.01,
          protein: 0.13,
          fat: 0.1,
          calorie: 1
        },
        {
          name: "Su bardağı (200ml)",
          carbonhydrate: 1.37,
          protein: 23.86,
          fat: 18.07,
          calorie: 272
        }
      ],
    },
    
  ])
 
  const checkMouse = (e) => {
    setMousePosition({
      left: e.pageX,
      top: e.pageY
    })
  }
  
  useEffect(() => {
    document.addEventListener('mousemove', checkMouse)
    return () => {
      document.removeEventListener('mousemove', checkMouse)
    }
  }, [])
  

  useEffect(() => {
    const newFilter = foods.filter((value) => {
      return value.name.toLowerCase().includes(searchWord)
    })
    setfilteredFoods(newFilter)
  }, [searchWord])  

  useEffect(() => {
    newDietName === "" ? setDisabled(true) : setDisabled(false)
  }, [newDietName])
  
 
  

  return (
    <div className='flex w-[1000px] h-full text-black z-10 text-center font-medium'>
        <div className='flex flex-col shadow-md shadow-black bg-slate-300 w-full h-full mx-2 rounded-3xl p-3'>
          <div>
            <Input type= {"search"} placeholder={"Aradığınız ürünü yazınız."} setState={setSearchWord} />
          </div>
          
          <div className='flex flex-wrap w-full h-full mt-[2%] p-[1%] overflow-y-auto justify-center  '>
            {
              searchWord === "" && (
                foods.map((food) => {
                  return (
                    <>
                      <button 
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
                      {
                        amountPage === food.name && (
                          <div className='absolute flex flex-col rounded-3xl shadow-lg shadow-black bg-slate-100 items-center self-center justify-self-center justify-center w-72 aspect-square '>
                            <div className='flex flex-col basis-2/3'>
                              {food.name.toUpperCase()}
                              <div className='flex basis-1/3 items-center'>
                                <div className='flex basis-1/4 items-end justify-end'>
                                  <input className='text-black rounded-l-2xl appearance-none border-2 p-3 w-[95%] self-center border-blue-200 focus:border-blue-600 outline-none h-[85%] text-base text-center'
                                    value={unit} 
                                    type={"number"}
                                    min={0}
                                    onChange= {
                                      (e) => {
                                        setUnit(Math.abs(e.target.value))
                                      }
                                    }
                                  />
                                </div>
                                <div className='flex basis-3/4 w-full  justify-start'>
                                  <select className='border-2  rounded-r-2xl p-3 text-center text-black w-[98%] border-blue-200 focus:border-blue-600 outline-none font-semibold'
                                    value={amount}
                                    onChange={(e) => {
                                      setAmount(e.target.value)
                                    }}
                                  >
                                    {
                                      food.amount.map((arg, index) => {
                                        return <Option value={index}>{arg.name}</Option>
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className='grid grid-cols-2 w-full justify-items-center'>
                              <button 
                              className="font-bold text-lg bg-green-400 text-black shadow-md shadow-green-300 p-1 max-w-[75px] rounded-xl hover:text-white text-center cursor-default self-center w-[50%] disabled:bg-gray-500 disabled:opacity-25 hover:bg-green-600"
                              onClick={() => {
                                setChosenFoods([...chosenFoods, {
                                  name: food.name,
                                  amount: [
                                    {
                                      name: unit + "x " + food.amount[amount].name.toUpperCase(),
                                      carbonhydrate: unit*food.amount[amount].carbonhydrate,
                                      protein: unit*food.amount[amount].protein,
                                      fat: unit*food.amount[amount].fat,
                                      calorie: unit*food.amount[amount].calorie
                                    }
                                  ]
                                }])
                                setCarbonhydrate(carbonhydrate+unit*food.amount[amount].carbonhydrate)
                                setProtein(protein+unit*food.amount[amount].protein)
                                setFat(fat+unit*food.amount[amount].fat)
                                setKcal(kcal+unit*food.amount[amount].calorie)
                                setAmount(0)
                                setUnit(0)
                                setAmountPage("")
                              }}
                              >
                                Ekle
                              </button>
                              <button 
                              className="font-bold text-lg bg-red-400 text-black shadow-md shadow-red-300 p-1 max-w-[75px] rounded-xl hover:text-white text-center cursor-default self-center w-[50%] disabled:bg-gray-500 disabled:opacity-25 hover:bg-red-600"
                              onClick={() => {
                                setAmount(0)
                                setUnit(0)
                                setAmountPage("")
                              }}
                              >
                                Kapat
                              </button>
                            </div>
                          </div>
                        )
                      }
                    </>
                  )
                })
              )
            }
            {
              searchWord !== "" && (
                filteredFoods.map((food) => {
                  return (
                    <>
                      <button 
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
                      {
                        amountPage === food.name && (
                          <div className='absolute flex flex-col rounded-3xl shadow-lg shadow-black bg-slate-100 items-center self-center justify-self-center justify-center w-72 aspect-square '>
                            <div className='flex flex-col basis-2/3'>
                              {food.name.toUpperCase()}
                              <div className='flex basis-1/3 items-center'>
                                <div className='flex basis-1/4 items-end justify-end'>
                                  <input className='text-black rounded-l-2xl appearance-none border-2 p-3 w-[95%] self-center border-blue-200 focus:border-blue-600 outline-none h-[85%] text-base text-center'
                                    value={unit} 
                                    type={"number"}
                                    min={0}
                                    onChange= {
                                      (e) => {
                                        setUnit(Math.abs(e.target.value))
                                      }
                                    }
                                  />
                                </div>
                                <div className='flex basis-3/4 w-full  justify-start'>
                                  <select className='border-2  rounded-r-2xl p-3 text-center text-black w-[98%] border-blue-200 focus:border-blue-600 outline-none font-semibold'
                                    value={amount}
                                    onChange={(e) => {
                                      setAmount(e.target.value)
                                    }}
                                  >
                                    {
                                      food.amount.map((arg, index) => {
                                        return <Option value={index}>{arg.name}</Option>
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className='grid grid-cols-2 w-full justify-items-center'>
                              <button 
                              className="font-bold text-lg bg-green-400 text-black shadow-md shadow-green-300 p-1 max-w-[75px] rounded-xl hover:text-white text-center cursor-default self-center w-[50%] disabled:bg-gray-500 disabled:opacity-25 hover:bg-green-600"
                              onClick={() => {
                                setChosenFoods([...chosenFoods, {
                                  name: food.name,
                                  amount: [
                                    {
                                      name: unit + "x " + food.amount[amount].name.toUpperCase(),
                                      carbonhydrate: unit*food.amount[amount].carbonhydrate,
                                      protein: unit*food.amount[amount].protein,
                                      fat: unit*food.amount[amount].fat,
                                      calorie: unit*food.amount[amount].calorie
                                    }
                                  ]
                                }])
                                setCarbonhydrate(carbonhydrate+unit*food.amount[amount].carbonhydrate)
                                setProtein(protein+unit*food.amount[amount].protein)
                                setFat(fat+unit*food.amount[amount].fat)
                                setKcal(kcal+unit*food.amount[amount].calorie)
                                setAmount(0)
                                setUnit(0)
                                setAmountPage("")
                              }}
                              >
                                Ekle
                              </button>
                              <button 
                              className="font-bold text-lg bg-red-400 text-black shadow-md shadow-red-300 p-1 max-w-[75px] rounded-xl hover:text-white text-center cursor-default self-center w-[50%] disabled:bg-gray-500 disabled:opacity-25 hover:bg-red-600"
                              onClick={() => {
                                setAmount(0)
                                setUnit(0)
                                setAmountPage("")
                              }}
                              >
                                Kapat
                              </button>
                            </div>
                          </div>
                        )
                      }
                    </>
                  )
                })
              )
            }
          </div>    
        </div>
        <div className='flex flex-col shadow-md shadow-black bg-slate-200 w-full h-full mx-2 rounded-3xl'>
          <div className='flex flex-wrap w-full h-full mt-[2%] p-[1%] overflow-y-auto'>
          {
            chosenFoods.map((chosenOne) => {
              return (
                  <button 
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
                      <td className='text-center text-end'>
                        Protein:
                      </td>
                      <td>
                        {Math.abs(protein.toFixed(2))} gr 
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center text-end'>
                        Yağ:
                      </td>
                      <td>
                        {Math.abs(fat.toFixed(2))} gr
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center text-end'>
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
                    <Button disabled={disabled} handleOnClick={() => {     
                      foods.every((food) => food.name !== newDietName) && 
                      setFoods(() => {return [
                        ...foods, 
                        {
                          name: newDietName,
                          amount: [
                            {
                              name: "belirlediğiniz",
                              carbonhydrate: carbonhydrate,
                              protein: protein,
                              fat: fat,
                              calorie: kcal
                            }
                          ]
                        }
                      ]})
                    }} >Ekle</Button>
                  </div>
              </div>  
            </div>
          </div>
        </div>
      {
        hoveredFood.name &&
        <div style={{top: `${mousePosition.top-10}px`, left: `${mousePosition.left-25}px`}}
        className="absolute z-20 w-max bg-black text-white rounded-3xl p-4">
          {
            <div className='flex flex-col w-max'>
              <div className='grid grid-cols-1 gap-1  w-full h-full place-items-center'>
                {hoveredFood.name.toUpperCase()} - {hoveredFood.amount[0].name?.toUpperCase()}
                <table className='table-auto w-max'>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-end'>
                        Karbonhidrat:
                      </td>
                      <td>
                        {(hoveredFood.amount[0].carbonhydrate).toFixed(2)} gr
                      </td>
                    </tr>
                    <tr>
                      <td className='text-end'>
                        Protein:
                      </td>
                      <td>
                        {(hoveredFood.amount[0].protein).toFixed(2)} gr
                      </td>
                    </tr>
                    <tr>
                      <td className='text-end'>
                        Yağ:
                      </td>
                      <td>
                        {(hoveredFood.amount[0].fat).toFixed(2)} gr
                      </td>
                    </tr>
                    <tr>
                      <td className='text-end'>
                        Kalori: 
                      </td>
                      <td>
                        {(hoveredFood.amount[0].calorie).toFixed(2)} kcal
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Diet