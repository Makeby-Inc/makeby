'use client'

import { commaizeNumber } from '@core/utils'
import { OpacityLayer } from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'
import { ReviewRequestButton } from '#/maker/product/ui/review-request-button'
import { type ProductData } from '#/maker/product/action'
import { productStatusMap } from '~/shared'

interface ProductItemProps {
	data: ProductData
}

export function ProductItem({ data }: ProductItemProps) {
	const { thumbnailUrl, title, representativePrice, options, id } = data
	const isReleased = data.status === 'RELEASED'

	return (
		<Link
			href={`/maker/product/${id}`}
			className="hover:bg-hover flex gap-4 rounded-sm py-4"
		>
			<div className="group relative h-fit overflow-hidden rounded-sm">
				<Image
					src={thumbnailUrl}
					alt={`${title}-thumbnail-image`}
					width={120}
					height={120}
					className="pc:w-[120px] pc:h-[120px] aspect-square h-[60px] w-[60px] object-center"
				/>
				{!isReleased && (
					<>
						<OpacityLayer className="bg-foreground/20 group-hover:bg-foreground/20" />
						<div className="bg-foreground/60 text-background pc:px-3 pc:py-2 pc:text-xs absolute bottom-0 left-0 z-40 w-full px-2 py-1 text-center text-[10px] font-medium">
							{productStatusMap[data.status]}
						</div>
					</>
				)}
			</div>

			<div className="grid h-fit flex-1 gap-2">
				<div className="max-pc:text-sm grid gap-1 font-semibold">
					<div>{title}</div>
					<div>{commaizeNumber(representativePrice)}원</div>
				</div>
				<div className="text-secondary-foreground grid gap-0.5 text-xs">
					{options.map((option) => (
						<span key={option.id}>
							{option.title} ∙ {commaizeNumber(option.stock)}개 남음
						</span>
					))}
				</div>
			</div>

			<div className="self-center">
				{data.status === 'PENDING' && <ReviewRequestButton productId={data.id} />}
			</div>
		</Link>
	)
}
