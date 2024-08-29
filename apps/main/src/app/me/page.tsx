import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { MyPageMenu } from '#/me/_ui'
import { getMyDataAction } from '#/me'
import { MobileDetailHeader } from '~/shared'
import { LogOutButton } from '#/auth'

export const metadata = {
	title: '마이페이지'
}

export default async function MePage() {
	const session = await authService.getMySession()
	if (!session?.user.id) redirect('/start')
	const myData = await getMyDataAction(session.user.id)

	return (
		<>
			<MobileDetailHeader pageTitle="마이페이지" />
			<section className="pc:py-[60px] pc:max-w-[640px] flex flex-col gap-10 py-4">
				<div className="max-pc:hidden text-4xl font-semibold">마이페이지</div>
				<MyPageMenu myData={myData} />
				<LogOutButton />
			</section>
			<div className="h-[120px]" />
		</>
	)
}
