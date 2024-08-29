import { cn } from '@core/utils'
import Image from 'next/image'
import { type MakerCartItems } from '#/shop/cart'

interface CartItemCardProps {
	item: MakerCartItems['items'][0]
	className?: string
}

export function CartItemCard({
	item,
	className
}: CartItemCardProps): JSX.Element {
	const { option } = item
	const isOutOfStock = option.stock < item.quantity

	return (
		<div className={cn('max-pc:px-0 flex gap-4 border-b p-4', className)}>
			<div className="relative overflow-hidden rounded-lg">
				<Image
					src={option.thumbnailUrl}
					width={100}
					height={100}
					alt={option.title}
					className="max-pc:w-[60px] max-pc:h-[60px] aspect-square object-cover object-center"
				/>
				{isOutOfStock ? (
					<div className="text-primary-foreground absolute bottom-0 left-0 right-0 h-9 w-full bg-black/80 p-2 text-center text-sm font-medium ">
						재고 부족
					</div>
				) : null}
			</div>
			<div className="pc:gap-6 grid flex-1 gap-4">
				<div className="grid gap-1">
					<h5 className="font-semibold">
						{option.title} x {item.quantity}개
					</h5>
					<p className="text-secondary-foreground text-sm">{option.description}</p>
				</div>
				<div className="max-pc:text-end text-lg font-bold">
					{(option.price * item.quantity).toLocaleString()}원
				</div>
			</div>
		</div>
	)
}
