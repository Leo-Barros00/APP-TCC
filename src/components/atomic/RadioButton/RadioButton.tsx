import React from 'react'
import styled, { css, useTheme } from 'styled-components/native'

import { IRadioButton } from './interface'
import { IButton, IText } from '../TextButton/interface'

const Container = styled.TouchableHighlight<Omit<IButton, 'text'>>`
  width: ${({ fluid }) => fluid ? '100%' : 'auto'};
  min-height: 64px;
  border-radius: 12px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  margin: 4px 0;

  ${({ ghost, variant, theme }) => !ghost ?
    css`
      background-color: ${theme.colors[variant].main};
    ` : css`
      background-color: ${theme.colors[variant].main}33;
      border: 4px solid ${theme.colors[variant].main};
    `}
`

const ButtonText = styled.Text<IText>`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';

  color: ${({ ghost, variant, theme }) => theme.colors[variant][!ghost ? 'constrastText' : 'main']};
`

const RadioButton: React.FC<IRadioButton> = ({ ...props }) => {
    return (
        <ButtonText {...props} />
    )
}

export default RadioButton