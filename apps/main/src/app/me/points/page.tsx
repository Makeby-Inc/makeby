import { redirect } from 'next/navigation'
import { getMyPointsAction } from '#/me/point/action/get-my-points'
import { MobileDetailHeader } from '~/shared'
import { PointListTabs } from '#/me/point/ui/point-list-tabs'
import { EmptyContent } from '~/shared/ui/empty-content'

export const metadata = {
	title: '내 포인트 조회'
}

export default async function MyPointsPage() {
	const pointsResult = await getMyPointsAction()
	if (!pointsResult?.data) redirect('/me')
	const { totalPoint, points } = pointsResult.data

	return (
		<>
			<MobileDetailHeader pageTitle="내 포인트 조회" fallbackUrl="/me" />
			<section className="pc:py-[60px] pc:max-w-[600px] py-6">
				<h1 className="max-pc:hidden mb-10 text-4xl font-semibold">
					내 포인트 조회
				</h1>
				<div className="mb-5 rounded-2xl border px-6 py-5">
					<h5 className="text-sm font-medium">사용가능한 포인트</h5>
					<p className="text-primary text-xl font-bold">
						{totalPoint.toLocaleString()}P
					</p>
				</div>

				<PointListTabs points={points} />
				{points.length === 0 && (
					<EmptyContent
						title="아직 적립된 포인트가 없어요"
						description="주문을 확정하실 때마다 적립금이 쌓여요"
					/>
				)}
			</section>
		</>
	)
}
