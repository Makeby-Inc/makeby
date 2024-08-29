import { SocialLoginButton } from '@design-system/template'

export function ProvidersById({
	providers
}: {
	providers: ('kakao' | 'google' | 'naver' | null)[]
}) {
	return (
		<div className="flex gap-4">
			{providers.map((provider) => (
				<SocialLoginButton key={provider} provider={provider} />
			))}
		</div>
	)
}
