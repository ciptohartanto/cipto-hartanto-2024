export default function formatDate(date: string) {
  const newDate = new Date(date)
  const dateString = newDate.toDateString() // returns "Thu Dec 12 2024"
  const dateArray = dateString.split(' ')
  const formattedDate = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}` // "TDec 12, 2024"
  return formattedDate
}
