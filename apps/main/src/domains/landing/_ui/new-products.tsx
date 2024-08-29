import { type NewProduct } from '#/landing/_model'
import { ProductCard } from '#/shop/product/ui/product-card'

export function NewProducts({ productsData }: { productsData: NewProduct[] }) {
	return (
		<div className="flex flex-col gap-6">
			<div className="pc:text-xl text-base font-semibold">최신 상품</div>
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
