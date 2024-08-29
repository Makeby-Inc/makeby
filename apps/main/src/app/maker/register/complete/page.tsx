import { redirect } from 'next/navigation'
import Image from 'next/image'
import MakebyCompleteImage from '~/shared/assets/icon/makeby-complete-image.svg'
import { getMakerRegisteredStatusAction } from '#/maker'

export default async function MakerRegisterCompletePage() {
	const maker = await getMakerRegisteredStatusAction()
	if (!maker?.data) redirect('/maker/register')

	return (
		<div className="pc:min-h-[calc(100vh-68px)] grid min-h-[calc(100vh-56px)] items-center justify-center py-20">
			<div className="grid h-fit gap-6 whitespace-pre-line text-center">
				<Image
					src={MakebyCompleteImage}
					alt="3d_image"
					width={200}
					height={200}
					className="mx-auto"
				/>
				<div className="grid gap-2">
					<div className="text-2xl font-semibold">메이커 신청이 완료되었어요</div>
					<div className="text-secondary-foreground">{`현재 입력하신 신청서를 검토하고 있어요\n조금만 기다려주세요!`}</div>
				</div>
			</div>
		</div>
	)
}
