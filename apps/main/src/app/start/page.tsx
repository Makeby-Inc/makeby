import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { SocialLoginSection, StartSection } from '#/auth/ui'
import { isUserSignedUp } from '#/auth/action/is-user-signed-up'

interface StartPageProps {
	searchParams?: {
		nextPath?: string
	}
}

export const metadata = {
	title: '메잇바이 시작하기'
}

export default async function StartPage({ searchParams }: StartPageProps) {
	const nextPath = searchParams?.nextPath || '/'

	const session = await authService.getMySession()
	if (session?.user.id) {
		const isSignedUp = await isUserSignedUp()
		isSignedUp?.data
			? redirect(nextPath)
			: redirect(`/start/new?nextPath=${nextPath}`)
	}

	return (
		<StartSection>
			<SocialLoginSection />
		</StartSection>
	)
}
