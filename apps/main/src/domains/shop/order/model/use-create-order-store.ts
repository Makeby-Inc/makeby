'use client'

import { type DeliveryInformation } from '@core/models'
import { create } from 'zustand'

interface CreateOrderProps {
	deliveryInfo: DeliveryInformation | null
	deliveryMessage: string
	usedPoints: number
	paymentMethod: string
	agreeToPrivacyPolicy: boolean
	agreeToThirdPartiesPrivacyPolicy: boolean
	agreeToPaymentPolicy: boolean
}

interface CreateOrderState extends CreateOrderProps {
	setDeliveryInfo: (deliveryInfo: DeliveryInformation) => void
	setDeliveryMessage: (message: string) => void
	setUsedPoints: (points: number) => void
	setPaymentMethod: (method: string) => void

	toggleAgreeToPrivacyPolicy: (checked: boolean) => void
	toggleAgreeToThirdPartiesPrivacyPolicy: (checked: boolean) => void
	toggleAgreeToPaymentPolicy: (checked: boolean) => void
	toggleAllAgreements: (checked: boolean) => void
	reset: () => void
}

const initCreateOrderProps: CreateOrderProps = {
	deliveryInfo: null,
	deliveryMessage: '',
	usedPoints: 0,
	paymentMethod: 'CARD',
	agreeToPrivacyPolicy: false,
	agreeToThirdPartiesPrivacyPolicy: false,
	agreeToPaymentPolicy: false
}

export const useCreateOrderStore = create<CreateOrderState>((set) => ({
	...initCreateOrderProps,
	setDeliveryInfo: (deliveryInfo: DeliveryInformation) => {
		set({ deliveryInfo })
	},
	setDeliveryMessage: (deliveryMessage: string) => {
		set({ deliveryMessage })
	},
	setUsedPoints: (usedPoints: number) => {
		set({ usedPoints })
	},
	setPaymentMethod: (paymentMethod: string) => {
		set({ paymentMethod })
	},
	toggleAgreeToPrivacyPolicy: (checked) => {
		set({ agreeToPrivacyPolicy: checked })
	},
	toggleAgreeToThirdPartiesPrivacyPolicy: (checked) => {
		set({
			agreeToThirdPartiesPrivacyPolicy: checked
		})
	},
	toggleAgreeToPaymentPolicy: (checked) => {
		set({ agreeToPaymentPolicy: checked })
	},
	toggleAllAgreements: (checked) => {
		set({
			agreeToPrivacyPolicy: checked,
			agreeToThirdPartiesPrivacyPolicy: checked,
			agreeToPaymentPolicy: checked
		})
	},
	reset: () => {
		set(initCreateOrderProps)
	}
}))
