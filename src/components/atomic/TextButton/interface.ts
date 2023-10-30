import { TouchableHighlightProps } from 'react-native'
import { Variant } from '@Typings/theme'
import { ReactNode } from 'react'

export interface IButton extends TouchableHighlightProps {
  text: string
  variant: Variant
  fluid?: boolean
  ghost?: boolean
  loading?: boolean
  icon?: ReactNode
}

export interface IText extends TouchableHighlightProps {
  variant: Variant
  ghost?: boolean
}
