import { ReactNode } from 'react'

export interface IModal {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
  title: string
}
