import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { MobileDetailHeader } from '~/shared'

interface MakerRegisterLayoutProps {
	children: React.ReactNode
}

export const metadata = {
	title: '메이커 신청하기'
}

export default async function MakerRegisterLayout({
	children
}: MakerRegisterLayoutProps) {
	const session = await authService.getMySession()
	if (!session) redirect('/start?nextPath=/maker/register')

	return (
		<>
			<MobileDetailHeader pageTitle="메이커 신청" />
			{children}
		</>
	)
}
