import { GestureResponderEvent } from 'react-native'

export interface ISignUpButtons {
  handleOnPressNextButton: (event: GestureResponderEvent) => void
  nextButtonLoading?: boolean
}
