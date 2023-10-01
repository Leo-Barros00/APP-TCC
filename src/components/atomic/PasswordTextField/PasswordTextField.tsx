import React from 'react'

import TextField from '../TextField'

import { IPasswordTextField } from './interface'

const PasswordTextField: React.FC<IPasswordTextField> = ({ ...props }) => {
  return (
    <TextField
      {...props}
      keyboardType="default"
      autoComplete="password"
      textContentType="password"
      autoCapitalize="none"
      secureTextEntry={true}
    />
  )
}

export default PasswordTextField
