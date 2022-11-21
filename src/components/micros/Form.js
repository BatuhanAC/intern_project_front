import React from 'react'

const Form = ({children}) => {
  return (
    <form className='grid grid-cols-1 gap-y-1 font-semibold text-md p-3 text-center justify-items-center'>{children}</form>
  )
}

export default Form