interface ITransitionScreen {
  bgColor?: string
  message: string
  navigatesTo: () => void
}
