import { redirect } from 'next/navigation'
import { getMakerRegisteredStatusAction } from '#/maker'
import {
	MakerLandingButton,
	MakerLandingBanner,
	MakerLandingConversation,
	MakerLandingMakerBenefit,
	MakerLandingPricingDesktop,
	MakerLandingPricingMobile,
	MakerLandingUserBenefit,
	MobileBottomButton
} from '#/landing'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '메이커 신청'
}

export default async function MakerPage() {
	const maker = await getMakerRegisteredStatusAction()
	if (maker?.data?.status === 'PENDING') redirect('/maker/register/complete')
	if (maker?.data?.status === 'APPROVED') redirect('/maker/dashboard/product')

	return (
		<>
			<MobileDetailHeader pageTitle="메이커 신청" />
			<MakerLandingBanner />
			<section className="pc:w-[1080px]">
				<div className="pc:py-[160px] pc:gap-[200px] flex flex-col gap-20 py-10">
					<MakerLandingConversation />
					<MakerLandingMakerBenefit />
					<MakerLandingUserBenefit />
					<MakerLandingPricingDesktop />
					<MakerLandingPricingMobile />
					<MakerLandingButton />
					<MobileBottomButton />
				</div>
			</section>
		</>
	)
}
