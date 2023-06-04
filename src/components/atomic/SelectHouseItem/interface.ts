import { AddressState } from '@Store/reducers/user'
import { GestureResponderEvent } from 'react-native'

export interface SelectHouseItemProps {
  onPress?: (event: GestureResponderEvent) => void
  address: AddressState
}
