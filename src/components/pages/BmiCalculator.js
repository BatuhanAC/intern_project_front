import React,{useState} from 'react'
import Div from '../micros/Div'
import Form from '../micros/Form'
import Input from '../micros/Input'
import Button from '../micros/Button'

const BmiCalculator = () => {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [result, setResult] = useState(0)

  return (
    <Div>
      <Form>
        <label>
          Boy
          <div><Input type={"number"} placeholder={"Cm olarak giriniz."} setState={setHeight}/></div>
        </label>
        <label>
          Kilo
          <div><Input type={"number"} placeholder={"Kg olarak giriniz."} setState={setWeight}/></div>
        </label>
        <label className='flex items-center justify-center flex-col text-center'>
          Sonuç
          <div>
            {result}
          </div>
        </label>
      </Form>
      <Button handleOnClick={()=> {setResult((weight/(Math.pow((height/100), 2))).toFixed(1))}}>Hesapla</Button>
    </Div>
  )
}

export default BmiCalculator