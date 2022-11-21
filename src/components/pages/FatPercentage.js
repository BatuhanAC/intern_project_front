import React,{useState} from 'react'
import Div from '../micros/Div'
import Form from '../micros/Form'
import Input from '../micros/Input'
import Button from '../micros/Button'

const FatPercentage = () => {
  const [height, setHeight] = useState(0)
  const [neck, setNeck] = useState(0)
  const [waist, setWaist] = useState(0)
  const [result, setResult] = useState(0)

  return (
    <Div>
    <Form>
      <label>
        Boy
        <div>
          <Input type={"number"} placeholder={"Cm olarak giriniz."} setState={setHeight}/>
        </div>
      </label>
      
      <label>
        Boyun Çevresi
        <div>
          <Input type={"number"} placeholder={"Cm olarak giriniz."} setState={setNeck}/>
        </div>
      </label>

      <label>
        Bel Çevresi
        <div>
          <Input type={"number"} placeholder={"Cm olarak giriniz."} setState={setWaist}/>
        </div>
      </label>

      <label>
        Sonuç
      </label>
      <div>
          %{result}
      </div>
    </Form>
    <Button handleOnClick={()=> {setResult(((495/(1.0324-(0.19077*Math.log10(waist-neck))+(0.15456*Math.log10(height))))-450).toFixed(1))}}>Hesapla</Button>
  </Div>
  )
}

export default FatPercentage