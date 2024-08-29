'use client'

import { useEffect, useRef, useState } from 'react'
import { useAction } from '@core/react'
import { Skeleton } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { cn } from '@core/utils'
import Image from 'next/image'
import { ProductCard, getRecentProductIds } from '#/shop'
import { getRecentViewedProductsAction } from '#/landing/_action'
import { type RecentViewedProduct } from '#/landing/_model'
import ChevronLeftIcon from '~/shared/assets/icon/chevron-left.svg'

export function RecentViewedProducts() {
	const [loading, setLoading] = useState(true)
	const [productsData, setProductsData] = useState<
		RecentViewedProduct[] | undefined
	>([])

	const carouselRef = useRef<HTMLDivElement>(null)

	const getRecentViewedProducts = useAction(getRecentViewedProductsAction, {
		onSuccess: ({ data }) => {
			setProductsData(data)
			setLoading(false)
		},
		onError: () => {
			setLoading(false)
		}
	})
	useEffect(() => {
		const recentProductIds = getRecentProductIds()
		getRecentViewedProducts.execute({
			ids: recentProductIds
		})
	}, [])

	if (!productsData?.length) return null

	const scrollTo = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const scrollAmount = carouselRef.current.offsetWidth // 카드 크기만큼 스크롤
			const currentScroll = carouselRef.current.scrollLeft

			if (direction === 'right') {
				carouselRef.current.scrollTo({
					left: currentScroll + scrollAmount,
					behavior: 'smooth'
				})
			} else {
				carouselRef.current.scrollTo({
					left: currentScroll - scrollAmount,
					behavior: 'smooth'
				})
			}
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="pc:text-xl text-base font-semibold">최근 본 상품</div>
			<div className="flex w-full items-center gap-[45px]">
				<CarouselButton direction="left" onClick={() => scrollTo('left')} />
				<div
					ref={carouselRef}
					className="scrollbar-hide pc:w-[calc(100%-(160px+90px))] flex snap-x snap-mandatory gap-4 overflow-x-auto "
				>
					{loading
						? Array.from({ length: 4 }).map((_, index) => (
								<Skeleton
									key={index}
									className="pc:w-[235px] aspect-square h-full w-full rounded-sm"
								/>
						  ))
						: productsData.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									className="max-w-[187.5px] snap-center" // 계산된 값이 187.5px
								/>
						  ))}
				</div>
				<CarouselButton direction="right" onClick={() => scrollTo('right')} />
			</div>
		</div>
	)
}

function CarouselButton({
	direction,
	onClick
}: {
	direction: 'left' | 'right'
	onClick: () => void
}) {
	return (
		<button type="button" onClick={onClick} className="max-pc:hidden">
			<Image
				src={ChevronLeftIcon}
				alt="왼쪽 화살표"
				width={80}
				height={80}
				className={cn('h-20 w-20', direction === 'right' && 'scale-x-[-1]')}
			/>
		</button>
	)
}
