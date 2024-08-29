import { MakerBenefitContents } from '#/landing/_ui/maker-benefit-contents'

export function MakerLandingMakerBenefit() {
	return (
		<div className="pc:gap-[60px] flex flex-col gap-10">
			<div className="pc:gap-6 flex flex-col gap-4">
				<div className="pc:gap-2 pc:text-4xl pc:font-bold flex flex-col items-center justify-center text-2xl font-semibold">
					<div>
						<span className="text-primary">메잇바이</span>를 이용하면
					</div>
					<div>작가님은 도안만 만들면 돼요!</div>
				</div>
				<div className="text-secondary-foreground pc:text-xl flex items-center justify-center text-sm font-medium">
					기존 공구 시장의 복잡한 과정을 한 번에 처리해 드려요!
				</div>
			</div>
			<MakerBenefitContents />
		</div>
	)
}
