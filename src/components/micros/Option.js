import React from 'react'

const Option = ({children, value}) => {
  return (
    <option value={value}>{children}</option>
  )
}

export default Option