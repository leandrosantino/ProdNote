export function convertDateStringtoDateObject (date: string) {
  if (date === '') {
    return undefined
  }
  const [year, month, day] = date.split('-').map(entry => Number(entry))
  const dateObject = new Date(year, month - 1, day)
  return dateObject
}
