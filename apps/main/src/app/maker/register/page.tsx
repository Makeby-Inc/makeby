import { redirect } from 'next/navigation'
import { MakerRegisterForm, getMakerRegisteredStatusAction } from '#/maker'

export default async function RegisterPage() {
	const maker = await getMakerRegisteredStatusAction()
	if (maker?.data?.status === 'PENDING') redirect('/maker/register/complete')
	if (maker?.data?.status === 'APPROVED') redirect('/maker')

	return (
		<section className="pc:py-[60px] pc:w-[640px] grid gap-[60px] py-6">
			<h1 className="max-pc:hidden text-3xl font-semibold">메이커 신청</h1>
			<MakerRegisterForm />
		</section>
	)
}
