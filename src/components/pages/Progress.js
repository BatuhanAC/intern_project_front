import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import { progressProcess } from '../controller/apiController'
import Button from '../micros/Button'
import Label from '../micros/Label'
import Option from '../micros/Option'
import Select from '../micros/Select'

const cookie = new Cookies()
const now = new Date()
const getLastWeek = new Date()
getLastWeek.setDate(new Date().getDate()-6)
const days = ["Pzr", "Pzts", "Salı", "Çrş", "Prş", "Cuma", "Cmts"]

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
  const [today, setToday] = useState()
  const [lastWeek, setlastWeek] = useState()
  const [data, setData] = useState([])

  useEffect(() => {
    setToday(() => {
      const month = (now.getMonth()+1) < 10 ? `0${now.getMonth()+1}` : `${now.getMonth()+1}`

      return now.getDate() >= 10 ? `${now.getFullYear()}${now.getMonth()+1}${now.getDate()}` :
      `${now.getFullYear()}${month}0${now.getDate().toString()}`
    })

    setlastWeek(() => {
      const month = getLastWeek.getMonth()+1 < 10 ? `0${getLastWeek.getMonth()+1}` : `${getLastWeek.getMonth()+1}`
      return getLastWeek.getDate() >= 10 ? `${getLastWeek.getFullYear()}${month}${getLastWeek.getDate()}` :
      `${getLastWeek.getFullYear()}${month}0${getLastWeek.getDate()}`
    })

    setWeeklyOrder((w) => {
        for (let i = 1; i <= 7; i++) {
          if(now.getDay()+i <= 6){
            w[i-1].day = now.getDay()+i
          }else w[i-1].day = now.getDay()+i-7      
        }
        return [...w] 
      })
    }, [])

  useEffect(() => {
    if(newData.date){
      if(!(data.find((arg) => arg.date ===parseInt(today))?.date===parseInt(today))){
        progressProcess(cookie.get("jwt_auth"), null, "/addProgress", newData)
        setData((d) => [...d, newData])
      }
      else {
        setData((d) => {
            let previousValue = d.find(item => item.date === parseInt(today))
            let currentValue = {
              neck: newData["neck"] === 0 ? previousValue["neck"] : newData["neck"],
              chest: newData["chest"] === 0 ? previousValue["chest"] : newData["chest"],
              waist: newData["waist"] === 0 ? previousValue["waist"] : newData["waist"],
              hip: newData["hip"] === 0 ? previousValue["hip"] : newData["hip"],
              arm: newData["arm"] === 0 ? previousValue["arm"] : newData["arm"],
              weight: newData["weight"] === 0 ? previousValue["weight"] : newData["weight"],
              fat: newData["fat"] === 0 ? previousValue["fat"] : newData["fat"],
              date: newData["date"],
              day: newData["day"]
            }
            progressProcess(cookie.get("jwt_auth"), null, "/addProgress", currentValue)
            return [...d.filter(item => item.date !== parseInt(today)), currentValue]
          }
        )
      }
    }
  }, [newData])

  useEffect(() => {
    if(data.length < 1)
      progressProcess(cookie.get("jwt_auth"), setData, "/getAllProgress")

    setWeeklyOrder((w) => {
      data.forEach((argData) => {
        if(argData.date <= parseInt(today) && argData.date >= parseInt(lastWeek)){
          w[w.findIndex((argWeekly) => argData.day === argWeekly.day)] = argData
        }
      })
      return [...w]
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
            <div>
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
          range === 0 && (
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
                  weeklyOrder.map((arg, key) => {
                    return (
                      <tr key={key} className=' 2xl:h-12 xl:h-11 md:h-10 sm:h-4 h-1'>
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