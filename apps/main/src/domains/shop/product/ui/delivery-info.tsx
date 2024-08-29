import Image from 'next/image'
import { DELIVERY_COST } from '~/shared'
import Icon from './assets/delivery-icon.jpeg'

export function DeliveryInfo() {
	return (
		<div className="grid gap-4 py-6">
			<h5 className="text-sm font-medium">배송정보</h5>
			<div className="flex gap-4">
				<Image
					src={Icon}
					alt="택배 아이콘"
					width={100}
					height={100}
					className="h-10 w-10 rounded-full"
				/>
				<div className="text-sm">
					<p>
						<span className="mr-1 font-medium">로젠 택배</span>
						{DELIVERY_COST.toLocaleString()}원
					</p>
					<p className="text-secondary-foreground">3~5일 내 도착 예정</p>
				</div>
			</div>
		</div>
	)
}
