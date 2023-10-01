import { TextInputProps } from 'react-native'

export interface INavBarButtonText extends TextInputProps {
  text: string
  isRouteSelected: boolean
}
