import { UserBenefitContents } from '#/landing/_ui/user-benefit-contents'

export function MakerLandingUserBenefit() {
	return (
		<div className="pc:gap-[60px] flex flex-col gap-10">
			<div className="pc:gap-6 flex flex-col gap-4">
				<div className="pc:gap-2 pc:text-4xl pc:font-bold flex flex-col items-center justify-center text-2xl font-semibold">
					<div>구매자님은 기다림 없이</div>
					<div>굿즈를 바로 받아볼 수 있어요!</div>
				</div>
			</div>
			<UserBenefitContents />
		</div>
	)
}
