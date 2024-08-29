import { type PopularProduct } from '#/landing/_model'
import { ProductCard } from '#/shop/product/ui/product-card'

export function PopularProducts({
	productsData
}: {
	productsData: PopularProduct[]
}) {
	return (
		<div className="flex flex-col gap-6">
			<div className="pc:text-xl text-base font-semibold">인기 상품</div>
			<div className="pc:grid-cols-5 grid grid-cols-2 gap-4 gap-y-6 ">
				{productsData.map((product) => (
					<div key={product.id}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	)
}
