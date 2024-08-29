import { setOffsetToKorea } from '~/shared/utils/set-offset-to-korea'

export function getDatesByWeekNumber({
	weekNumber,
	year
}: {
	weekNumber: number
	year: number
}) {
	const startDate = setOffsetToKorea(new Date(year, 0, 1 + (weekNumber - 1) * 7))
	const endDate = setOffsetToKorea(
		new Date(year, 0, 1 + (weekNumber - 1) * 7 + 6)
	)

	const dates: Date[] = []
	const currentDate = new Date(startDate)
	while (currentDate <= endDate) {
		dates.push(new Date(currentDate))
		currentDate.setDate(currentDate.getDate() + 1)
	}

	return {
		startDate,
		endDate,
		dates
	}
}
