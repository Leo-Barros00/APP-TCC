import React from 'react'
import styled, { css, useTheme } from 'styled-components/native'
import AnimatedLottieView from 'lottie-react-native'

import { hexToHsl } from '../../../utils/color'

import { IButton, IText } from './interface'

const Container = styled.TouchableHighlight<Omit<IButton, 'text'>>`
  flex-grow: ${({ fluid }) => (fluid ? '1' : '0')};
  min-height: 64px;
  border-radius: 12px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
  box-sizing: border-box;

  ${({ ghost, variant, theme }) =>
    !ghost
      ? css`
          background-color: ${theme.colors[variant].main};
          border: 4px solid ${theme.colors[variant].main};
        `
      : css`
          background-color: ${theme.colors[variant].main}33;
          border: 4px solid ${theme.colors[variant].main};
        `}
`

const ButtonText = styled.Text<IText>`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';

  color: ${({ ghost, variant, theme }) =>
    theme.colors[variant][!ghost ? 'constrastText' : 'main']};
`

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 18px;
  justify-content: center;
  align-items: center;
`

function getMinButtonUnderlayColorLightness(currentLightness: number): number {
  const decreasedLightness = Math.max(10, currentLightness - 15)
  return Math.min(currentLightness, decreasedLightness)
}

const TextButton: React.FC<IButton> = ({
  children,
  text,
  variant,
  loading,
  disabled,
  icon,
  ...props
}) => {
  const { colors } = useTheme()
  const { hue, saturation, lightness } = hexToHsl(colors[variant].main)

  const underlayLightness = getMinButtonUnderlayColorLightness(lightness)

  return (
    <Container
      underlayColor={`hsl(${hue} ${saturation}% ${underlayLightness}%)`}
      variant={variant}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <AnimatedLottieView
          source={require('./button_loading_dots_animation.json')}
          autoPlay
          loop={true}
        />
      ) : (
        <ButtonContainer>
          <ButtonText variant={variant} {...props}>
            {text}
          </ButtonText>
          {icon}
        </ButtonContainer>
      )}
    </Container>
  )
}

export default TextButton
