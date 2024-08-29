import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { getFleamarketLikesAction, getMarketLikesAction } from '#/me/likes'
import { LikeList } from '#/me/likes/_ui'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '찜 목록'
}

export default async function LikeListPage() {
	const session = await authService.getMySession()

	if (!session) redirect('/start')

	const [MarketLikesData, FleamarketLikesData] = await Promise.all([
		getMarketLikesAction(session.user.id),
		getFleamarketLikesAction(session.user.id)
	])

	return (
		<>
			<MobileDetailHeader pageTitle="찜 목록" fallbackUrl="/me" />
			<section className="pc:py-[60px] pc:gap-10 flex flex-col gap-6 py-6">
				<div className="pc:text-4xl max-pc:hidden text-2xl font-semibold">
					찜 목록
				</div>
				<LikeList
					marketProductsData={MarketLikesData}
					fleamarketProductsData={FleamarketLikesData}
				/>
			</section>
		</>
	)
}
