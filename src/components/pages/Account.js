import React from 'react'
import Div from '../micros/Div'
import Form from '../micros/Form'


const Account = () => {
  return (
    <Div>
      <Form>
        <label>
          İsim: Batuhan Acar
        </label>
        <label>
          Yaş: 24
        </label>
        <label>
          Email: batuhan@batuhan.com
        </label>
        <label>
          Son Giriş: 23.09.2022 
        </label>
        

      </Form>
    </Div>
  )
}

export default Account