import { type DeliveryInformation } from '@core/models'
import { create } from 'zustand'

interface UpdateDeliveryInfoProps {
	data?: DeliveryInformation
}

type DeliveryInfoKey = keyof DeliveryInformation

interface UpdateDeliveryInfoState extends UpdateDeliveryInfoProps {
	setData: (data: DeliveryInformation) => void
	setValue: <K extends DeliveryInfoKey>(
		key: K,
		value: DeliveryInformation[K]
	) => void
	reset: () => void
}

export const useUpdateDeliveryInfoStore = create<UpdateDeliveryInfoState>(
	(set, get) => ({
		data: undefined,
		setData: (data) => {
			set({ data })
		},
		setValue: (key, value) => {
			const oldData = get().data
			if (!oldData) {
				throw new Error('Data is not set')
			}

			const data = { ...oldData, [key]: value }
			set({ data })
		},
		reset: () => {
			set({ data: undefined })
		}
	})
)
