export function formatServiceValueToString(value: number) {
  let realFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return realFormatter.format(value);
}
