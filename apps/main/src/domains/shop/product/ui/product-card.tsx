import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import Image from 'next/image'
import Link from 'next/link'
import { type ProductListItem } from '#/shop/product/model'

interface ProductCardProps {
	product: ProductListItem
	className?: string
}

export function ProductCard({
	product,
	className
}: ProductCardProps): JSX.Element {
	return (
		<div className={cn('flex shrink-0 flex-col gap-3', className)}>
			<Link
				href={`/shop/products/${product.id}`}
				className="bg-base-50 group overflow-hidden rounded-lg"
			>
				<Image
					src={product.thumbnailUrl}
					alt={product.title}
					width={235}
					height={235}
					className="aspect-square w-full object-cover object-center transition-transform group-hover:scale-110"
				/>
			</Link>
			<div className="grid gap-2">
				<div className="grid gap-1">
					<span className="text-primary text-xs font-medium">
						{product.productCategory.name}
					</span>
					<div className="grid gap-0.5">
						<Link
							href={`/shop/detail/${product.maker.slug}`}
							className="group flex items-center gap-0.5"
						>
							<span className="text-xs font-semibold">
								{product.maker.businessName}
							</span>
							<Icon
								name="ChevronRightIcon"
								className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
							/>
						</Link>
						<div className="truncate text-xs">{product.title}</div>
						<div className="mb-0.5 mt-[10px] text-xs font-bold">
							{product.representativePrice.toLocaleString()}원
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<div className="text-secondary-foreground flex items-center gap-0.5 text-xs">
						<Icon name="HeartIcon" size="sm" />
						<span>{product._count.likes}</span>
					</div>
					<div className="text-secondary-foreground flex items-center gap-0.5 text-xs">
						<Icon name="ChatBubbleLeftIcon" size="sm" />
						<span>{product._count.reviews}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
