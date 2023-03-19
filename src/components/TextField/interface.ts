import { TextInputProps } from "react-native"
import { Variant } from "../../../typings/theme"

export interface ITextField extends TextInputProps {
  variant: Variant
  fluid?: boolean
}