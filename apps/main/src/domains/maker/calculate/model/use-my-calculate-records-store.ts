import { create } from 'zustand'
import { type CalculateRecord } from './calculate-record'

interface MyCalculateRecordsProps {
	year: number
	month: number
	records: CalculateRecord[]
	productId?: string | null
}

interface MyCalculateRecordsState extends MyCalculateRecordsProps {
	setRecords: (records: CalculateRecord[]) => void
	setPrevMonth: () => void
	setNextMonth: () => void
	setProductId: (productId: string) => void
}

const initialProps: MyCalculateRecordsProps = {
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	records: []
}

export const useMyCalculateRecordsStore = create<MyCalculateRecordsState>(
	(set) => ({
		...initialProps,
		setRecords: (records) => set({ records }),
		setPrevMonth: () => {
			set((state) => {
				const prevMonth = state.month - 1
				if (prevMonth < 1) {
					return { month: 12, year: state.year - 1 }
				}
				return { month: prevMonth }
			})
		},
		setNextMonth: () => {
			set((state) => {
				const nextMonth = state.month + 1
				if (nextMonth > 12) {
					return { month: 1, year: state.year + 1 }
				}
				return { month: nextMonth }
			})
		},
		setProductId: (productId) =>
			set({
				productId
			})
	})
)
