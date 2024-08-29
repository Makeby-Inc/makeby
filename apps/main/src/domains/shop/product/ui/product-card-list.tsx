'use client'
import { cn } from '@core/utils'
import { Skeleton } from '@design-system/ui'
import { useProducts } from '#/shop/product/model/use-products'
import { ProductCard } from '#/shop/product/ui/product-card'
import { EmptyContent } from '~/shared/ui/empty-content'

export function ProductCardList(): JSX.Element {
	const { loading, products } = useProducts()

	const isEmpty = !loading && products.length === 0

	return (
		<div
			className={cn('pc:grid-cols-4 pc:gap-y-10 grid grid-cols-2 gap-x-4 gap-y-6')}
		>
			{loading
				? Array.from({ length: 12 }).map((_, index) => (
						<Skeleton key={index} className="h-[300px] w-full rounded" />
				  ))
				: products.map((product) => (
						<ProductCard key={product.id} product={product} />
				  ))}

			{isEmpty ? (
				<div className="col-span-full">
					<EmptyContent
						title="현재 표시할 상품이 없어요"
						description="다른 카테고리를 살펴보거나 검색해 보세요"
						className="h-screen"
					/>
				</div>
			) : null}
		</div>
	)
}
