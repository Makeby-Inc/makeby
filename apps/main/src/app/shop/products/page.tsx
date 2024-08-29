import {
	FilterSoldoutButton,
	ProductCategories,
	ProductsSortbyDropdown
} from '#/shop/product/ui'
import { ProductCardList } from '#/shop/product/ui/product-card-list'
import { getProductCategoriesAction } from '~/shared/action/get-product-categories'

export const metadata = {
	title: '상품 목록'
}

export default async function ShopProductsPage() {
	const categories = await getProductCategoriesAction()

	return (
		<section className="pc:px-0">
			<h1 className="pc:pt-[60px] pc:pb-10 pc:text-4xl py-6 text-2xl font-semibold">
				상품
			</h1>
			<div className="max-pc:flex-col pc:gap-10 flex">
				<ProductCategories categories={categories?.data || []} />
				<div className="grid flex-1 gap-6">
					<div className="pc:justify-end pc:gap-6 flex items-center justify-between py-6">
						<FilterSoldoutButton />
						<ProductsSortbyDropdown />
					</div>
					<ProductCardList />
				</div>
			</div>
		</section>
	)
}
