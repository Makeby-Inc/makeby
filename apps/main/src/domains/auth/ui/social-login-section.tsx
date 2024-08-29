import { type SocialLoginProviders } from '@design-system/template'
import { GlobalSocialLoginButton } from '#/auth/ui/global-social-login-button'

export function SocialLoginSection() {
	const socialLoginProviders = [
		'naver',
		'kakao',
		'google'
	] as SocialLoginProviders[]

	return (
		<div className="flex items-center gap-4">
			{socialLoginProviders.map((provider) => (
				<GlobalSocialLoginButton key={provider} provider={provider} />
			))}
		</div>
	)
}
