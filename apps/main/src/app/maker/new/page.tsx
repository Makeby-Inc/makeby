import { ProductRegisterForm } from '#/maker/product/ui'
import { MobileDetailHeader, getProductCategoriesAction } from '~/shared'

export const metadata = {
	title: '상품 등록하기'
}

export default async function NewProductPage() {
	const categories = await getProductCategoriesAction()

	return (
		<main>
			<MobileDetailHeader pageTitle="상품 등록" />
			<section className="pc:w-[640px] pc:py-[60px] py-6">
				<div className="grid gap-[60px]">
					<h1 className="max-pc:hidden text-3xl font-bold">상품 등록</h1>
					<ProductRegisterForm categories={categories?.data || []} />
				</div>
			</section>
		</main>
	)
}
