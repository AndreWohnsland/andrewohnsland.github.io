const dateFormatter = (dateString: string): string => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const dateToConvert = new Date(dateString)
  return formatter.format(dateToConvert)
}
export default dateFormatter
