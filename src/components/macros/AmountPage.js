import Option from "../micros/Option"

const AmountPage = ({food, unit, amount, chosenFoods, carbonhydrate, protein, fat, kcal, 
  setUnit, setAmount, setChosenFoods, setCarbonhydrate, setProtein, setFat, setKcal, setAmountPage
}) => {

  return (
    <>
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
    </>
  )
}

export default AmountPage