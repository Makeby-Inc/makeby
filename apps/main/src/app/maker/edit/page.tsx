import { MakerEditForm, getMakerDetailAction } from '#/maker'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '메이커 정보 수정'
}

export default async function MakerProfileEditPage() {
	const maker = await getMakerDetailAction()

	return (
		<section className="pc:max-w-[640px]">
			<MobileDetailHeader pageTitle="메이커 정보 수정" />
			<div className="pc:py-[60px] grid gap-[60px] px-4 py-6">
				<h1 className="max-pc:hidden text-3xl font-semibold">메이커 정보 수정</h1>
				<MakerEditForm data={maker?.data?.maker} />
			</div>
		</section>
	)
}
