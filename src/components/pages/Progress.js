import React, {useState, useEffect} from 'react'
import Button from '../micros/Button'
import Label from '../micros/Label'
import Option from '../micros/Option'
import Select from '../micros/Select'


const Progress = () => {
  const [range, setRange] = useState(0)
  const [weight, setWeight] = useState(0)
  const [fat, setFat] = useState(0)
  const [neck, setNeck] = useState(0)
  const [chest, setChest] = useState(0)
  const [waist, setWaist] = useState(0)
  const [hip, setHip] = useState(0)
  const [arm, setArm] = useState(0)
  const [newData, setNewData] = useState({})
  const [weeklyOrder, setWeeklyOrder] = useState([{},{},{},{},{},{},{}])
  const days = ["Pzr", "Pzts", "Salı", "Çrş", "Prş", "Cuma", "Cmts"]
  const now = new Date()
  const [today, setToday] = useState( () => {
    const month = (now.getMonth()+1) < 10 ? `0${now.getMonth()+1}` : `${now.getMonth+1}`
    return now.getDate() >= 10 ? `${now.getFullYear()}${now.getMonth()+1}${now.getDate()}` :
    `${now.getFullYear()}${month}0${now.getDate()}`
  })
  const getLastWeek = new Date()
  getLastWeek.setDate(new Date().getDate()-6)
  const [lastWeek, setlastWeek] = useState(() => {
    const month = getLastWeek.getMonth()+1 < 10 ? `0${getLastWeek.getMonth()+1}` : `${getLastWeek.getMonth()+1}`
    return getLastWeek.getDate() >= 10 ? `${getLastWeek.getFullYear()}${month}${getLastWeek.getDate()}` :
    `${getLastWeek.getFullYear()}${month}0${getLastWeek.getDate()}`
  })
  
  const [data, setData] = useState([
    {
      neck: 37,
      chest: 82,
      waist: 88,
      hip: 90,
      arm: 34,
      weight: 74,
      fat: 18,
      date: 20221009,
      day: 0
    },
    {
      neck: 38,
      chest: 83,
      waist: 89,
      hip: 91,
      arm: 35,
      weight: 75,
      fat: 19,
      date: 20221012,
      day: 3
    },
    {
      neck: 39,
      chest: 84,
      waist: 90,
      hip: 92,
      arm: 36,
      weight: 76,
      fat: 20,
      date: 20221010,
      day: 1
    },
    {
      neck: 40,
      chest: 85,
      waist: 91,
      hip: 93,
      arm: 37,
      weight: 77,
      fat: 21,
      date: 20221011,
      day: 2
    }
  ])

  useEffect(() => {
    setWeeklyOrder(() => {
        for (let i = 1; i <= 7; i++) {
          if(now.getDay()+i <= 6){
            weeklyOrder[i-1].day = now.getDay()+i
          }else weeklyOrder[i-1].day = now.getDay()+i-7      
        }
        return weeklyOrder 
      })
    }, [])

  useEffect(() => {
    if(!(data.find((arg) => arg.date ===parseInt(today))?.date===parseInt(today))){
      setData([...data,newData])
    }
    else {
      setData(data.map(
        item => item.date === parseInt(today) ?
        newData : item
      ))
    }
  }, [newData])

  useEffect(() => {
    setWeeklyOrder(() => {
      data.map((argData) => {
        if(argData.date <= parseInt(today) && argData.date >= parseInt(lastWeek)){
          weeklyOrder[weeklyOrder.findIndex((argWeekly) => argData.day === argWeekly.day)] = argData
        }
      })
      return [...weeklyOrder]
    })
  }, [data])

  return (
    <div className='flex w-full h-full text-black z-10 text-center font-medium'>
      <div className='grid grid-cols-2 gap-2 shadow-md shadow-emerald-300 bg-emerald-300 w-full h-full mx-2 rounded-3xl p-3'>
          <Label type={"number"} placeholder="kg" setState={setWeight} >Kilo</Label>
          <Label type={"number"} placeholder="%" setState={setFat} >Yağ Oranı</Label>
          <Label type={"number"} placeholder="cm" setState={setNeck} >Boyun Ölçünüz</Label>
          <Label type={"number"} placeholder="cm" setState={setChest} >Göğüs Ölçünüz</Label>
          <Label type={"number"} placeholder="cm" setState={setWaist} >Bel Ölçünüz</Label>
          <Label type={"number"} placeholder="cm" setState={setHip} >Kalça Ölçünüz</Label>
          <Label type={"number"} placeholder="cm" setState={setArm} >Kol Ölçünüz</Label>
          <div className='flex items-center justify-center'>
            <Button handleOnClick={() => {
              setNewData({
                neck: neck,
                chest: chest,
                waist: waist,
                hip: hip,
                arm: arm,
                weight: weight,
                fat: fat,
                date: parseInt(today),
                day: parseInt(now.getDay())
              })
            }}>
              Kaydet
            </Button>
          </div>
      </div>
      <div className='flex flex-col shadow-md shadow-emerald-200 bg-emerald-200 w-full h-full mx-2 rounded-3xl'>
        <div className='flex justify-center h-[18%]' >
          <label className='flex flex-col w-[35%] '>
            Gelişim Aralığı
            <div >
              <Select setState={setRange}>
                <Option value={0}>Haftalık</Option>
                <Option value={1}>Aylık</Option>
                <Option value={2}>Yıllık</Option>
              </Select>
            </div>
          </label>
        </div>  
        {
          range == 0 && (
            <table className='table-auto min-w-max'>
              <thead>
                <tr>
                  <th className='w-20'>
                    
                  </th>
                  <th>
                    Kilo-Yağ
                  </th>
                  <th>
                    Boyun
                  </th>
                  <th>
                    Göğüs
                  </th>
                  <th>
                    Bel
                  </th>
                  <th>
                    Kalça
                  </th>
                  <th>
                    Kol
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  weeklyOrder.map((arg) => {
                    return (
                      <tr className=' 2xl:h-12 xl:h-11 md:h-10 sm:h-4 h-1'>
                        <td className='font-bold'>
                          {days[arg.day]}:
                        </td>
                        <td className='font-bold'>
                          {arg.weight} - {arg.fat}
                        </td>
                        <td className='font-bold'>
                          {arg.neck}
                        </td>
                        <td className='font-bold'>
                          {arg.chest}
                        </td>
                        <td className='font-bold'>
                          {arg.waist}
                        </td>
                        <td className='font-bold'>
                          {arg.hip}
                        </td>
                        <td className='font-bold'>
                          {arg.arm}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  )
}

export default Progress