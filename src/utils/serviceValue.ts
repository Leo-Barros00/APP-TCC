export function calculateServiceValue(
  metersBuilt: number,
  hasAnimals: boolean,
  value: number
) {
  const multiplier = hasAnimals ? 1.1 : 1

  return value * multiplier
}

export function formatServiceValueToString(value: number) {
  let realFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  return realFormatter.format(value)
}
