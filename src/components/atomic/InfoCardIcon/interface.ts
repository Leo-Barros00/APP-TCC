import { ReactNode } from 'react'

export interface IInfoCardIcon {
  title: string
  subtitle: string
  icon: ReactNode
  secondIcon?: ReactNode
  bgColor: boolean
  size?: string
  onPress: () => void
}
