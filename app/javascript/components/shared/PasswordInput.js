import React from 'react'
import { TextInput } from 'components/shared'

const PasswordInput = (props) => {
  return(
    <TextInput
     { ...props }
     type='password' />
  )
}

export default PasswordInput
