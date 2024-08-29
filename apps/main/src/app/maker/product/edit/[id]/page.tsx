import { notFound, redirect } from 'next/navigation'
import { authService } from '@providers/auth'
import { ProductEditForm } from '#/maker'
import { getProductDetail } from '#/shop'
import { getProductCategoriesAction } from '~/shared/action'
import { MobileDetailHeader } from '~/shared/ui'

export default async function MakerProductEditPage({
	params: { id }
}: {
	params: {
		id: string
	}
}) {
	const [userId, categories, { productDetail }] = await Promise.all([
		authService.getMyUserIdOrThrow(),
		getProductCategoriesAction(),
		getProductDetail(id)
	])

	if (!productDetail) notFound()
	if (productDetail.status !== 'PENDING') {
		redirect(`/maker/product/${productDetail.id}`)
	}
	if (productDetail.maker.userId !== userId) {
		redirect(`/maker/dashboard/product`)
	}

	return (
		<main>
			<MobileDetailHeader pageTitle="상품 수정" />
			<section className="pc:w-[640px] pc:py-[60px] py-6">
				<div className="grid gap-[60px]">
					<h1 className="max-pc:hidden text-3xl font-bold">상품 수정</h1>
					<ProductEditForm
						categories={categories?.data || []}
						product={productDetail}
					/>
				</div>
			</section>
		</main>
	)
}
