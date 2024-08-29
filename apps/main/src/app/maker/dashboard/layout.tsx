import { redirect } from 'next/navigation'
import { getMakerDetailAction, MakerMenu } from '#/maker'
import { MobileDetailHeader, MobileTab } from '~/shared'

interface MakerDashboardLayoutProps {
	children: React.ReactNode
}

export const metadata = {
	title: '메이커 대시보드'
}

export default async function MakerDashboardLayout({
	children
}: MakerDashboardLayoutProps) {
	const makerResult = await getMakerDetailAction()
	const makerData = makerResult?.data
	if (!makerData) redirect('/maker/register')

	const { maker, totalReviewCount, totalOrderCount } = makerData

	const tabs = [
		{ label: '내 상품 내역', href: '/maker/dashboard/product' },
		{ label: '판매 내역', href: '/maker/dashboard/order' },
		{ label: '정산 내역', href: '/maker/dashboard/calculation' }
	]

	return (
		<section className="pc:py-[60px] max-pc:px-0 pc:gap-10 pc:flex-row mx-auto flex h-full min-h-screen w-full flex-col">
			<MobileDetailHeader pageTitle="메이커 대시보드" />
			<div className="pc:p-0 pc:flex-1 flex flex-col">
				<MakerMenu
					makerImageUrl={maker.profileUrl ?? ''}
					makerName={maker.businessName}
					socialNetworkIds={maker.socialIds}
					reviewCount={totalReviewCount}
					sellCount={totalOrderCount}
				/>
				<MobileTab data={tabs} />
			</div>
			<div className="pc:max-w-[800px] w-full">{children}</div>
		</section>
	)
}
