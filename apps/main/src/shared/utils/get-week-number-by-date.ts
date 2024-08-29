export function getWeekNumber(date: Date): number {
	const oneJan = new Date(date.getFullYear(), 0, 1)
	const diff = date.getTime() - oneJan.getTime()
	const oneDay = 1000 * 60 * 60 * 24
	return Math.ceil(diff / oneDay / 7)
}
