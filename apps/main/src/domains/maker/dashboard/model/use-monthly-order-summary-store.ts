import { create } from 'zustand'

interface MonthlyOrderSummaryData {
	totalOrderAmount: number
	totalCancelAmount: number
	totalExchangeAmount: number
	totalRevenue: number
}

interface MonthlyOrderSummaryProps extends MonthlyOrderSummaryData {
	year: number
	month: number
}

interface MonthlyOrderSummaryState extends MonthlyOrderSummaryProps {
	setData: (data: MonthlyOrderSummaryData) => void
	setPrevMonth: () => void
	setNextMonth: () => void
}

const initialProps: MonthlyOrderSummaryProps = {
	totalOrderAmount: 0,
	totalCancelAmount: 0,
	totalExchangeAmount: 0,
	totalRevenue: 0,
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1
}

export const useMonthlyOrderSummaryStore = create<MonthlyOrderSummaryState>(
	(set, get) => ({
		...initialProps,
		setData: (data) => {
			set((prev) => ({
				...prev,
				...data
			}))
		},
		setPrevMonth: () => {
			const state = get()

			if (state.month === 1) {
				set((data) => ({
					...data,
					month: 12,
					year: state.year - 1
				}))
				return
			}

			set((data) => ({
				...data,
				month: state.month - 1
			}))
		},
		setNextMonth: () => {
			const state = get()

			if (state.month === 12) {
				set((data) => ({
					...data,
					month: 1,
					year: state.year + 1
				}))
				return
			}

			set((data) => ({
				...data,
				month: state.month + 1
			}))
		}
	})
)
