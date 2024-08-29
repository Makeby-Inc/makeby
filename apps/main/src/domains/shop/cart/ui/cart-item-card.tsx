'use client'
import { cn } from '@core/utils'
import Image from 'next/image'
import { Button, useToast } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useAction } from '@core/react'
import { type MakerCartItems } from '#/shop/cart/model'
import { updateCartQuantityAction } from '#/shop/cart/action'

interface CartItemCardProps {
	item: MakerCartItems['items'][0]
	className?: string
}

export function CartItemCard({
	item,
	className
}: CartItemCardProps): JSX.Element {
	const { option } = item
	const { toast } = useToast()
	const updateCartItemQuantity = useAction(updateCartQuantityAction, {
		onSuccess: () => {
			toast({
				title: '장바구니 수량을 변경했어요'
			})
		}
	})
	const isOutOfStock = option.stock < item.quantity

	function handleCartItemQuantity(quantity: number) {
		const optionId = option.id
		updateCartItemQuantity.execute({
			optionId,
			quantity
		})
	}

	return (
		<div className={cn('flex gap-4 rounded-2xl p-4', className)}>
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
			<div className="grid w-full gap-4">
				<div className="flex gap-5">
					<div className="flex-1">
						<h5 className="text-sm font-semibold">{option.title}</h5>
						<p className="text-secondary-foreground text-sm">{option.description}</p>
					</div>
					<Button
						size="sm"
						options="icon"
						variant="outline"
						onClick={() => {
							handleCartItemQuantity(0)
						}}
					>
						<Icon name="XMarkIcon" size="sm" />
					</Button>
				</div>

				<div className="flex justify-between">
					<div className="flex items-center">
						<Button
							size="sm"
							options="icon"
							variant="outline"
							disabled={item.quantity === 1}
							onClick={() => {
								handleCartItemQuantity(item.quantity - 1)
							}}
						>
							<Icon name="MinusIcon" size="sm" />
						</Button>
						<div className="flex h-8 w-8 items-center justify-center  text-center text-sm font-semibold">
							{item.quantity}
						</div>
						<Button
							size="sm"
							options="icon"
							variant="outline"
							disabled={item.quantity >= option.stock}
							onClick={() => {
								handleCartItemQuantity(item.quantity + 1)
							}}
						>
							<Icon name="PlusIcon" size="sm" />
						</Button>
					</div>

					<p className="text-lg font-bold">
						{(option.price * item.quantity).toLocaleString()}원
					</p>
				</div>
			</div>
		</div>
	)
}
