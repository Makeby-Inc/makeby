'use client'
import { cn } from '@core/utils'
import Image from 'next/image'
import { type MyOrderItem } from '#/me/order/model/my-order-item'

interface OrderItemProps {
	item: MyOrderItem
	className?: string
}

export function OrderItemInfo({
	item,
	className
}: OrderItemProps): JSX.Element {
	return (
		<div className={cn('', className)}>
			<div className="flex items-center justify-between">
				<div className="flex gap-4 py-6">
					<Image
						src={item.option.thumbnailUrl}
						alt={item.option.title}
						width={120}
						height={120}
						className="max-pc:w-[60px] max-pc:h-[60px]"
					/>
					<div className="grid">
						<span className="mb-1 text-xs">
							{item.option.product.maker.businessName}
						</span>
						<div className="grid gap-2">
							<h5 className="font-semibold">{item.option.product.title}</h5>
							<div className=" text-secondary-foreground text-sm">
								{item.option.title} / {item.quantity}개
							</div>
							<span className="text-sm font-semibold">
								{item.totalPrice.toLocaleString()}원
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
