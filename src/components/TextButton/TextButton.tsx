import React from 'react'
import styled, { css, useTheme } from 'styled-components/native'

import { IButton, IText } from './interface'

const Container = styled.TouchableHighlight<Omit<IButton, 'text'>>`
  width: ${({ fluid }) => fluid ? '100%' : 'auto'};
  min-height: 64px;
  border-radius: 12px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  margin: 4px;

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

  ${({ ghost, variant, theme }) => !ghost ?
    css`
      color: ${theme.colors[variant].constrastText};
    ` : css`
      color: ${theme.colors[variant].main};
    `}
`

const TextButton: React.FC<IButton> = ({ children, text, variant, ...props }) => {
  const { colors } = useTheme()

  return (
    <Container
      underlayColor={colors[variant].main}
      variant={variant}
      {...props}
    >
      <ButtonText
        variant={variant}
        {...props}
      >
        {text}
      </ButtonText>
    </Container>
  )
}

export default TextButton