import { TouchableHighlightProps } from "react-native"
import { Variant } from "../../theme/theme"

export interface IButton extends TouchableHighlightProps {
  text: string
  variant: Variant
  fluid?: boolean
  ghost?: boolean
}

export interface IText extends TouchableHighlightProps {
  variant: Variant
  ghost?: boolean
}