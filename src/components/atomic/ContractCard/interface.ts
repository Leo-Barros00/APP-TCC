import { ReactNode } from 'react'

export interface IContractCard {
  value: string
  icon: ReactNode
  houseSize: string
  contractorName: string
  jobDescription: string
  locale: string
}
