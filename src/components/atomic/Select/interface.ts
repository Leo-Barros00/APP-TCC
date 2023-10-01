interface ISelectOption {
  id: string
  value: string
}

export interface ISelect {
  title: string
  selectedOption?: string
  options?: ISelectOption[]
  onSelect: (selectedOption: string) => void
  disabled?: boolean
}
