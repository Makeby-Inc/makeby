import { create } from 'zustand'
import { getWeekNumber } from '~/shared'

interface SummaryData {
	totalRevenueAmount: number
	totalRevenueCount: number
}

interface DailyOrderSummary extends SummaryData {
	date: Date
}

interface WeeklyOrderSummary {
	dailyItems: DailyOrderSummary[]
	totalRevenueAmount: number
	totalRevenueCount: number
}

interface WeeklyOrderSummaryProps extends WeeklyOrderSummary {
	year: number
	weekNumber: number
}

interface WeeklyOrderSummaryStore extends WeeklyOrderSummaryProps {
	setPrevWeek: () => void
	setNextWeek: () => void
	setData: (data: WeeklyOrderSummary) => void
}

const today = new Date()

const initialProps: WeeklyOrderSummaryProps = {
	dailyItems: [],
	totalRevenueAmount: 0,
	totalRevenueCount: 0,
	year: today.getFullYear(),
	weekNumber: getWeekNumber(today)
}

export const useWeeklyOrderSummaryStore = create<WeeklyOrderSummaryStore>(
	(set, get) => ({
		...initialProps,
		setPrevWeek: () => {
			const { year, weekNumber } = get()
			const prevWeek = weekNumber - 1
			if (prevWeek < 1) {
				set({ year: year - 1, weekNumber: 52 })
			} else {
				set({ year, weekNumber: prevWeek })
			}
		},
		setNextWeek: () => {
			const { year, weekNumber } = get()
			const nextWeek = weekNumber + 1
			if (nextWeek > 52) {
				set({ year: year + 1, weekNumber: 1 })
			} else {
				set({ year, weekNumber: nextWeek })
			}
		},
		setData: (data) => {
			set(data)
		}
	})
)
