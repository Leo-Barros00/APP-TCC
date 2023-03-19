import React from 'react'
import styled from 'styled-components/native'

import { ITextField } from './interface'

const TextInput = styled.TextInput<ITextField>`
  width: ${({ fluid }) => fluid ? '100%' : 'auto'};
  min-height: 64px;
  padding: 14px 16px 10px;
  margin: 4px 0;
  border-radius: 12px;
  font-size: 20px;
  font-family: 'Poppins-SemiBold';

  border: 4px solid ${({ variant, theme }) => theme.colors[variant].main};
`

const TextField: React.FC<ITextField> = ({ ...props }) => {
  return (
    <TextInput
      {...props}
    />
  )
}

export default TextField