import { authService } from '@providers/auth'
import { notFound, redirect } from 'next/navigation'
import { FleamarketEditForm, getFleamarketProductDetail } from '#/flea-market'
import { MobileDetailHeader, getProductCategoriesAction } from '~/shared'

export const metadata = {
	title: '중고거래 상품 수정'
}

export default async function FleamarketProductEditPage({
	params: { id }
}: {
	params: {
		id: string
	}
}) {
	const session = await authService.getMySession()
	if (!session) redirect('/start')
	const [categories, { productDetail }] = await Promise.all([
		getProductCategoriesAction(),
		getFleamarketProductDetail(id)
	])
	if (!productDetail) notFound()

	return (
		<div>
			<MobileDetailHeader pageTitle="중고 거래 상품 수정" />
			<section className="pc:max-w-[640px] pc:py-[60px] grid gap-[60px] py-6">
				<h1 className="max-pc:hidden text-3xl font-semibold">중고거래 상품 수정</h1>
				<FleamarketEditForm
					categories={categories?.data || []}
					product={productDetail}
				/>
			</section>
		</div>
	)
}
