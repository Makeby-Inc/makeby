import { setOffsetToKorea } from '~/shared/utils/set-offset-to-korea'

export function getMonthWeekByWeekNumber({
	weekNumber,
	year
}: {
	weekNumber: number
	year: number
}) {
	// result : 2024년 1월 2주차
	const startDate = setOffsetToKorea(new Date(year, 0, 1 + (weekNumber - 1) * 7))
	const month = startDate.getMonth() + 1
	const monthWeek = Math.ceil(startDate.getDate() / 7)

	return {
		year,
		month,
		monthWeek
	}
}
