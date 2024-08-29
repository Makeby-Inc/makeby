import { type DeliveryInformation } from '@core/models'
import {
	OrderInfoTemplate,
	type OrderInfoTemplateProps
} from '#/me/order/ui/orders/order-info-template'

interface OrderDeliveryInfoProps
	extends Pick<
		DeliveryInformation,
		'address' | 'addressee' | 'phoneNumber' | 'detailAddress'
	> {
	deliveryMessage?: string
}

export function OrderDeliveryInfo({
	address,
	addressee,
	detailAddress,
	phoneNumber,
	deliveryMessage
}: OrderDeliveryInfoProps): JSX.Element {
	const data: OrderInfoTemplateProps = {
		title: '배송지 정보',
		items: [
			{
				title: '받는 분',
				value: addressee
			},
			{
				title: '연락처',
				value: phoneNumber
			},
			{
				title: '주소',
				value: `${address}, ${detailAddress}`
			},
			{
				title: '배송 메모',
				value: deliveryMessage || '없음'
			}
		]
	}

	return <OrderInfoTemplate {...data} />
}
