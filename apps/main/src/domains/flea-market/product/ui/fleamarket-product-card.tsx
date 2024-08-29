import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { OpacityLayer } from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'
import { type FleamarketProductListItem } from '#/flea-market/product/model'
import defaultImage from '~/shared/assets/images/square-default-image.png'

export function FleamarketProductCard({
	product,
	className
}: {
	product: FleamarketProductListItem
	className?: string
}) {
	const thumbnail = product.productImages.find((image) => image.isPrimary)
		?.imageUrl

	const isLabelVisible =
		product.status === 'SOLD_OUT' || product.status === 'RESERVED'

	const showPrice =
		product.tradeType === 'SELL' || product.tradeType === 'PURCHASE'

	return (
		<Link
			href={`/fleamarket/products/${product.id}`}
			className={cn('group grid gap-4', className)}
		>
			<div className="bg-secondary group relative overflow-hidden rounded-lg">
				<Image
					src={thumbnail || defaultImage}
					alt={product.title}
					width={250}
					height={250}
					className="aspect-square object-cover object-center transition-transform group-hover:scale-110"
				/>
				{isLabelVisible ? (
					<div className="bg-foreground/60 text-background absolute bottom-0 z-20 w-full py-2 text-center text-sm font-medium">
						{product.status === 'SOLD_OUT' && '거래 완료'}
						{product.status === 'RESERVED' && '예약중'}
					</div>
				) : null}
				{product.status === 'SOLD_OUT' && (
					<OpacityLayer className="bg-foreground/20 group-hover:bg-foreground/20" />
				)}
			</div>

			<div className="grid gap-3">
				<div className="grid gap-1 text-xs">
					<span className="text-primary font-medium">
						{product.productCategory.name}
					</span>
					<div className="flex items-center gap-0.5">
						<span className="font-bold">{product.seller.name}</span>
						<Icon
							name="ChevronRightIcon"
							className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-3"
						/>
					</div>
					<div className="truncate text-xs">{product.title}</div>
					{showPrice ? (
						<div className="mb-0.5 mt-[10px] text-xs font-bold">
							{product.price?.toLocaleString()}원
						</div>
					) : null}
				</div>

				<div className="text-secondary-foreground flex gap-2 text-xs">
					<div className="flex items-center gap-0.5 ">
						<Icon name="HeartIcon" className="h-5 w-5" />
						<span>{product._count.likes}</span>
					</div>
					<div className="flex items-center gap-0.5 ">
						<Icon name="EyeIcon" className="h-5 w-5" />
						<span>{product.viewCount}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
