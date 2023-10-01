export function getDateString(date: Date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
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
