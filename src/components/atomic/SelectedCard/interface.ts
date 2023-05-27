import { Variant } from '@Typings/theme'

export interface IRadioButton {
  text: string
  onPress: () => void
  variant: Variant
  fluid?: boolean
  selected: boolean
  ghost?: boolean
}
