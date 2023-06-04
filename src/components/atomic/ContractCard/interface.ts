import { ReactNode } from 'react'
import { GestureResponderEvent } from 'react-native'

export interface IContractCard {
  value: string
  icon: ReactNode
  houseSize: string
  contractorName: string
  jobDescription: string
  locale: string
  onPress?: (event: GestureResponderEvent) => void
}
