import React from 'react'

const Select = ({children, setState, selected}) => {
  return (
    <select className='border-2 p-2 text-center text-black w-[85%] border-blue-200 focus:border-blue-600 outline-none rounded-2xl font-semibold'
      onChange={(e) => {setState(e.target.value)}}
      value={selected}
    >{children}</select>
  )
}

export default Select