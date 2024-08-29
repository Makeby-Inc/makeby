export function setOffsetToKorea(date: Date): Date {
	const offset = date.getTimezoneOffset() / 60
	const koreaOffset = 9
	const diff = koreaOffset - offset
	const newDate = new Date(date.getTime() + diff * 60 * 60 * 1000)
	return newDate
}
