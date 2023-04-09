import { TouchableHighlightProps } from "react-native"
import { Variant } from "../../../../typings/theme"

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