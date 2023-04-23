import { Variant } from '../../../../typings/theme'

export interface IRadioButton {
  text: string
  onPress: () => void
  variant: Variant
  fluid?: boolean
  selected: boolean;
  ghost?: boolean
}
