import { cn } from '@core/utils'
import { Button, ButtonProps } from '@design-system/ui'
import { VariantProps, cva } from 'class-variance-authority'

const logoVariants = cva('', {
	variants: {
		size: {
			default: 'h-5 w-5',
			sm: 'h-4 w-4',
			lg: 'h-5 w-5'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

interface SocialLoginProviderLogoProps
	extends VariantProps<typeof logoVariants>,
		Required<VariantProps<typeof socialLoginButtonVariants>> {}
export type SocialLoginProviders = Exclude<
	SocialLoginProviderLogoProps['provider'],
	null
>

export function SocialLoginProviderLogo({
	provider,
	size
}: SocialLoginProviderLogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className={cn(logoVariants({ size }))}
		>
			{provider === 'kakao' && (
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 19.9515C18.2592 19.9515 23.3333 15.7837 23.3333 10.6424C23.3333 5.50117 18.2592 1.33334 12 1.33334C5.74073 1.33334 0.666626 5.50117 0.666626 10.6424C0.666626 13.7404 2.509 16.485 5.34288 18.1771L4.4444 22.6666L8.60782 19.5274C9.67885 19.803 10.8183 19.9515 12 19.9515Z"
					fill="black"
				/>
			)}
			{provider === 'naver' && (
				<path
					d="M1 2V22H8.3125V11.9938L14.6758 22H22V2H14.6758V11.9938L8.3125 2H1Z"
					fill="white"
				/>
			)}
			{provider === 'google' && (
				<>
					<path
						fill="#4285F4"
						d="M20.6,12.2c0-0.6-0.1-1.3-0.2-1.8H12v3.5h4.8C16.6,15,16,15.9,15,16.6v2.3H18C19.7,17.3,20.6,14.9,20.6,12.2L20.6,12.2z"
					/>
					<path
						fill="#34A853"
						d="M12,21c2.4,0,4.5-0.8,6-2.2L15,16.6c-0.8,0.5-1.8,0.9-3,0.9c-2.3,0-4.3-1.6-5-3.7H4V16C5.4,19,8.5,21,12,21L12,21z"
					/>
					<path
						fill="#FBBC05"
						d="M7,13.7c-0.2-0.5-0.3-1.1-0.3-1.7s0.1-1.2,0.3-1.7V8H4c-0.6,1.2-1,2.6-1,4s0.3,2.8,1,4L7,13.7L7,13.7z"
					/>
					<path
						fill="#EA4335"
						d="M12,6.6c1.3,0,2.5,0.5,3.4,1.3L18,5.3C16.5,3.9,14.4,3,12,3C8.5,3,5.4,5,4,8l3,2.3C7.7,8.2,9.7,6.6,12,6.6L12,6.6z"
					/>
					<path fill="none" d="M3,3h18v18H3V3z" />
				</>
			)}
		</svg>
	)
}

const socialLoginButtonVariants = cva('rounded-full font-bold', {
	variants: {
		provider: {
			kakao: 'bg-[#FEE500] text-black hover:bg-[#FEE500]',
			google: 'border bg-white text-black hover:bg-white',
			naver: 'bg-[#03C75A] text-white hover:bg-[#03C75A]'
		}
	},
	defaultVariants: {
		provider: 'kakao'
	}
})

/**
 * 소셜로그인 버튼입니다.
 * - `provider` : 소셜로그인 제공자 (kakao, google, naver)
 * - `size` : 버튼 크기 (기본값: md)
 * - `children` : 버튼 내부에 표시할 내용
 */
function SocialLoginButton({
	className,
	children,
	size,
	provider,
	...props
}: Omit<ButtonProps, 'variant'> & SocialLoginProviderLogoProps) {
	return (
		<Button
			{...props}
			variant="default"
			options="icon"
			className={cn(socialLoginButtonVariants({ provider }))}
			size={size}
		>
			<SocialLoginProviderLogo provider={provider} size={size} />
		</Button>
	)
}
SocialLoginButton.displayName = 'SocialLoginButton'

export { SocialLoginButton }
