import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { SignUpForm, SignUpSection, isUserSignedUp } from '#/auth'

interface SignUpPageProps {
	searchParams?: {
		nextPath?: string
	}
}

export const metadata = {
	title: '회원가입'
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
	const nextPath = searchParams?.nextPath || '/'

	const session = await authService.getMySession()
	if (!session) redirect(`/start?nextPath=${nextPath}`)
	const isSignedUp = await isUserSignedUp()
	if (isSignedUp?.data) redirect(nextPath)

	return (
		<SignUpSection>
			<SignUpForm />
		</SignUpSection>
	)
}
