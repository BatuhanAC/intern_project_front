import React from 'react'

const Div = ({children}) => {
  return (
    <div className='grid content-center justify-items-center text-white z-0 min-w-min text-center'>
      {children}
    </div>
  )
}

export default Div