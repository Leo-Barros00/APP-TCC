interface ISelectOption {
  id: string
  value: string
}

export interface ISelect {
  isButton?: boolean
  title: string
  selectedOption?: string
  options?: ISelectOption[]
  onSelect: (selectedOption: string) => void
  disabled?: boolean
}
