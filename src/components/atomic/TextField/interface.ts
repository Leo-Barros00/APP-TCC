import { TextInputProps } from 'react-native'
import { Variant } from '@Typings/theme'

export interface ITextField extends TextInputProps {
  variant: Variant
  fluid?: boolean
}
