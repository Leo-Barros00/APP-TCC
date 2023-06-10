export interface Neighborhood {
  id: string
  name: string
  cityId: string
}

export interface City {
  id: string
  name: string
  neighborhoods: Neighborhood[]
}

export interface State {
  id: string
  name: string
  uf: string
  cities: City[]
}

export interface Contract {
  value: number
  date: Date
  description: string
  houseId: string
  providerId: string
  accepted?: boolean
}
