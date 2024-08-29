import { ProductCard } from '#/shop'

interface ProductsData {
	product: {
		id: string
		createdAt: Date
		updatedAt: Date
		makerId: string
		title: string
		thumbnailUrl: string
		status: 'PENDING' | 'REVIEWING' | 'RELEASED' | 'IN_PRODUCTION'
		description: string
		representativePrice: number
		categoryId: number
		tags: string[]
		productImages: string[]
		maker: {
			slug: string
			name: string
			businessName: string
		}
		productCategory: {
			name: string
		}
		_count: {
			reviews: number
			likes: number
		}
	}
}

export function RecommendedProducts({
	productsData
}: {
	productsData: ProductsData[]
}) {
	return (
		<div className="flex flex-col gap-6">
			<div className="pc:text-xl text-base font-semibold">추천 상품</div>
			<div className="pc:grid-cols-5 grid grid-cols-2 gap-4 gap-y-6 ">
				{productsData.map(({ product }) => (
					<div key={product.id}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	)
}
