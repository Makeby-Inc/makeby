'use client'
import { type DeliveryInformation } from '@core/models'
import { useEffect } from 'react'
import { useCreateOrderStore } from '#/shop/order/model'
import { SelectedDeliveryInfoCard } from '#/me/order/ui/delivery-info'

interface SelectedDeliveryInfoProps {
	primaryDeliveryInfo: DeliveryInformation
	className?: string
}

export function SelectedDeliveryInfo({
	primaryDeliveryInfo,
	className
}: SelectedDeliveryInfoProps): JSX.Element {
	const { deliveryInfo, setDeliveryInfo } = useCreateOrderStore()

	useEffect(() => {
		setDeliveryInfo(primaryDeliveryInfo)
	}, [primaryDeliveryInfo])

	if (!deliveryInfo) return <></>

	return (
		<SelectedDeliveryInfoCard deliveryInfo={deliveryInfo} className={className} />
	)
}
