'use client'
import { cn } from '@core/utils'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'
import { useCreateOrderStore } from '#/shop/order/model'

const options = [
	'부재 시 문 앞에 두고 가주세요.',
	'부재 시 경비실에 맡겨주세요.',
	'부재 시 택배함에 넣어주세요.',
	'도착하기 전에 미리 연락 부탁드립니다.'
]

export function SelectDeliveryMessage(): JSX.Element {
	const { deliveryMessage, setDeliveryMessage } = useCreateOrderStore()

	return (
		<Select onValueChange={setDeliveryMessage}>
			<SelectTrigger>
				<SelectValue placeholder="배송 메모를 선택해 주세요" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((option) => (
						<SelectItem
							key={option}
							value={option}
							className={cn('cursor-pointer', {
								'bg-gray-100': deliveryMessage === option
							})}
						>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
