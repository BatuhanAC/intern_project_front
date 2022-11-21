import React from 'react'
import Input from './Input'

const Label = ({type, placeholder, setState, children}) => {
  return (
    <div>
      <label >
        {children}
        <div><Input type={type} placeholder={placeholder} setState={setState}  /></div>
      </label>
    </div>
  )
}

export default Label