import { type Notification } from '@core/models'
import { create } from 'zustand'

interface NotificationsProps {
	items: Notification[]
}

interface NotificationsState extends NotificationsProps {
	setItems: (items: Notification[]) => void
}

export const useNotificationsStore = create<NotificationsState>((set) => {
	return {
		items: [],
		setItems: (items) => set({ items })
	}
})
