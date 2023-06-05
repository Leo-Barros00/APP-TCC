export function calculateServiceValue(metersBuilt: number, hasAnimals: boolean) {
  const multiplier = hasAnimals ? 1.75 : 1.7

  let realFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  return realFormatter.format(metersBuilt * multiplier)
}
