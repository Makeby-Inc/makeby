import { redirect } from 'next/navigation'
import { authService } from '@providers/auth'
import { isUserSignedUp } from '#/auth'

interface MyPageLayoutProps {
	children: JSX.Element
}

export default async function MyPageLayout({ children }: MyPageLayoutProps) {
	const session = await authService.getMySession()
	const isUser = await isUserSignedUp()

	if (!session || !isUser?.data) {
		redirect('/start?nextPath=/me')
	}

	return <div>{children}</div>
}
