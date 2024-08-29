import { PricingMobileCardBasic } from '#/landing/_ui/pricing-mobile-card-basic'
import { PricingMobileCardEssential } from '#/landing/_ui/pricing-mobile-card-essential'
import { PricingMobileCardPremium } from '#/landing/_ui/pricing-mobile-card-premium'

export function MakerLandingPricingMobile() {
	return (
		<div className="pc:hidden">
			<div className="flex flex-col gap-10">
				<div className="flex items-center justify-center text-2xl font-semibold">
					요금제 안내
				</div>
				<div className="flex flex-col gap-4">
					<PricingMobileCardBasic />
					<PricingMobileCardEssential />
					<PricingMobileCardPremium />
				</div>
			</div>
		</div>
	)
}
