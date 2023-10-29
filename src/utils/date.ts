export function getDateString(date: Date, withYear: boolean = true) {
  return withYear
    ? date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    : date.getDate() + '/' + (date.getMonth() + 1)
}

export function getTimeString(date: Date) {
  const hour =
    date.getUTCHours().toString().length < 2
      ? `0${date.getUTCHours()}`
      : date.getUTCHours()
  const minute =
    date.getUTCMinutes().toString().length < 2
      ? `0${date.getUTCMinutes()}`
      : date.getUTCMinutes()
  return hour + ':' + minute
}

export function mergeDateAndTime(date: Date, time: Date): Date {
  const ano = date.getFullYear()
  const mes = date.getMonth()
  const dia = date.getDate()
  const hora = time.getHours()
  const minuto = time.getMinutes()
  const milissegundo = time.getMilliseconds()

  const novaData = new Date(ano, mes, dia, hora, minuto, 0, milissegundo)

  return novaData
}
