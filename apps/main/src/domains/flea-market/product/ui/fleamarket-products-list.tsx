'use client'
import { cn } from '@core/utils'
import { Skeleton } from '@design-system/ui'
import { EmptyContent } from '~/shared/ui/empty-content'
import { useFleamarketProducts } from '#/flea-market/product/model'
import { FleamarketProductCard } from '#/flea-market/product/ui/fleamarket-product-card'

export function FleamarketProductsList() {
	const { loading, products } = useFleamarketProducts()

	const isEmpty = !loading && products.length === 0

	return (
		<div
			className={cn('pc:grid-cols-4 pc:gap-y-10 grid grid-cols-2 gap-x-4 gap-y-6')}
		>
			{products.map((product) => (
				<FleamarketProductCard key={product.id} product={product} />
			))}
			{loading
				? Array.from({ length: 12 }).map((_, index) => (
						<Skeleton key={index} className="h-[300px] w-full rounded" />
				  ))
				: null}

			{isEmpty ? (
				<div className="col-span-full">
					<EmptyContent
						title="현재 표시할 상품이 없어요"
						description="다른 카테고리를 살펴보거나 검색해 보세요"
						className="min-h-[calc(100vh-260px-80px)]"
					/>
				</div>
			) : null}
		</div>
	)
}
