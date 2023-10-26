import { ReactNode } from 'react'

export interface IIconButton {
  icon: ReactNode
  onPress?: () => void
  size?: number
}
