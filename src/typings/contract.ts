export interface IContract {
  id: string
  description: string
  value: string
  startDate: Date
  endDate: Date
  accepted: boolean
  workHours: number
  house: any
  contractor: any
  provider: any
  progressStatus: string
  avaliationId: string
  avaliation: any
}
