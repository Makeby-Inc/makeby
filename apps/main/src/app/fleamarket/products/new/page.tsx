import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { FleaMarketRegisterForm } from '#/flea-market'
import { MobileDetailHeader } from '~/shared'
import { getProductCategoriesAction } from '~/shared/action'

export const metadata = {
	title: '중고거래 상품 등록'
}

export default async function NewFleamarketProductPage() {
	const session = await authService.getMySession()
	if (!session) redirect('/start')
	const categories = await getProductCategoriesAction()

	return (
		<div>
			<MobileDetailHeader pageTitle="중고 거래 상품 등록" />
			<section className="pc:max-w-[640px] pc:py-[60px] flex flex-col gap-[60px] py-6">
				<h1 className="max-pc:hidden text-3xl font-semibold">중고거래 상품 등록</h1>
				<FleaMarketRegisterForm categories={categories?.data || []} />
			</section>
		</div>
	)
}
