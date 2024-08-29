/** YY.MM.DD 형식으로 날짜를 표시하는 함수 */
export function yymmdd(date: Date, separator = '.') {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	const monthString = month < 10 ? `0${month}` : `${month}`
	const dayString = day < 10 ? `0${day}` : `${day}`

	return `${year}${separator}${monthString}${separator}${dayString}`
}
