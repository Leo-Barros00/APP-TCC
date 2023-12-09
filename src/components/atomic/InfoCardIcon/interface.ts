import { ReactNode } from 'react'

export interface IInfoCardIcon {
  title: string
  subtitle: string
  icon: ReactNode
  secondIcon?: ReactNode
  thirdIcon?: ReactNode
  bgColor: boolean
  size?: string
  onPress: () => void
  onPressThirdIcon?: () => void
}
