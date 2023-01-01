import React,{useState} from 'react'
import Div from '../micros/Div'
import Form from '../micros/Form'
import Input from '../micros/Input'
import Button from '../micros/Button'
import Select from '../micros/Select'
import Option from '../micros/Option'
const CalorieCalculator = () => {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState("")
  const [fat, setFat] = useState(0)
  const [movement, setMovement] = useState("")
  const [result, setResult] = useState(0)

  const calculate = (weight, height, age, movement, gender, fat) => {
    if(gender===1){ 
      setResult((13.397*weight+4.799*height-5.677*age+88.362+movement/7).toFixed(2))
    }
    else setResult((9.247*weight+3.098*height- 4.330*age+447.593+movement/7).toFixed(2))
  }

  return (
    <Div>
    <label>
      Yağ Oranı
      <div>
        <Input type={"number"} placeholder={"%"} setState={setFat}/>
      </div>
    </label>
    <Form>
      <div className='grid grid-cols-2 gap-y-4 '>
        <label>
          Boy
          <div>
            <Input type={"number"} placeholder={"Cm"} setState={setHeight}/>
          </div>
        </label>
        
        <label>
          Kilo
          <div>
            <Input type={"number"} placeholder={"Kg"} setState={setWeight}/>
          </div>
        </label>

        <label>
          Yaş
          <div>
            <Input type={"number"} placeholder={"Yaşınız"} setState={setAge}/>
          </div>
        </label>

        <label>
          Cinsiyet
          <div>
            <Select setState={setGender}>
              <Option value={0}>Kadın</Option>
              <Option value={1}>Erkek</Option>
            </Select>
          </div>
        </label>
        </div>
      </Form>

    <label>
      Egzersiz Seviyesi
      <div>
        <select className='border-2 p-2 text-center text-black w-[75%] border-blue-200 focus:border-blue-600 outline-none rounded-2xl font-semibold' 
        onChange={(e)=>{
          if(e.target.value <= 2){
            setMovement(e.target.value*400)
          }
          else if(e.target.value === 3){
            setMovement(4*450)
          }
          else if(e.target.value >3 && e.target.value <=5){
            setMovement(e.target.value*600)
          }
          else if(e.target.value === 6){
            setMovement(e.target.value*700)
          }
          }}>
          <Option value={0}>Bazal metabolizma hızı.</Option>
          <Option value={1}>Az ya da hiç egzersiz yok.</Option>
          <Option value={2}>Haftada 1-3 gün egzersiz.</Option>
          <Option value={3}>Haftada 4-5 gün egzersiz.</Option>
          <Option value={4}>Hergün ya da 3-4 gün yoğun egzersiz.</Option>
          <Option value={5}>Haftada 6-7 gün yoğun egzersiz.</Option>
          <Option value={6}>Hergün yoğun egzersiz ve iş.</Option>
        </select>
      </div>
    </label>

    <label>
        Sonuç
        <div>
          Kilonuzu korumak için {result} kalori almalısınız.
        </div>
    </label>
    <div>
      <Button handleOnClick={
        ()=> {
          calculate(weight,height,age,movement,gender,fat)
          }
      }>Hesapla</Button>
    </div>
    
  </Div>
  )
}

export default CalorieCalculator