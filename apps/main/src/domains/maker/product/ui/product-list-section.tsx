'use client'

import { type ProductStatus } from '@core/models'
import { useSearchParams } from 'next/navigation'
import { type ProductData } from '#/maker/product/action'
import { ProductItem } from '#/maker/product/ui/product-item'
import { EmptyContent } from '~/shared/ui/empty-content'

interface ProductListSectionProps {
	products: ProductData[]
}

const emptyContentMap: Record<ProductStatus, string> = {
	PENDING: '심사 대기중인 상품이 없어요',
	REVIEWING: '심사 중인 상품이 없어요',
	IN_PRODUCTION: '제작 중인 상품이 없어요',
	RELEASED: '공개된 상품이 없어요'
}

export function ProductListSection({ products }: ProductListSectionProps) {
	const isProducts = products.length > 0
	const searchParams = useSearchParams()
	const status = searchParams.get('status') || 'released'

	return (
		<div className="max-pc:px-4 flex flex-1 flex-col">
			{isProducts ? (
				products.map((product) => <ProductItem key={product.id} data={product} />)
			) : (
				<EmptyContent
					title={emptyContentMap[status.toLocaleUpperCase() as ProductStatus]}
					className="flex-1"
				/>
			)}
		</div>
	)
}
