import React from 'react'

import TextField from '../TextField'

import { IEmailTextField } from './interface'

const EmailTextField: React.FC<IEmailTextField> = ({ ...props }) => {
  return (
    <TextField
    {...props}
    keyboardType='email-address'
    autoComplete='email'
    textContentType='emailAddress'
    autoCapitalize='none'    />
  )
}

export default EmailTextField