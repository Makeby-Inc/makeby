'use client'

import {
	SocialLoginButton,
	type SocialLoginProviders
} from '@design-system/template'
import { useAuth } from '@providers/auth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getLastLoginProvider, setLastLoginProvider } from '#/auth/model'
import PolygonImage from '~/shared/assets/icon/polygon.svg'

interface SocialLoginButtonProps {
	provider: SocialLoginProviders
}

export function GlobalSocialLoginButton({ provider }: SocialLoginButtonProps) {
	const { signIn } = useAuth()
	const [lastProvider, setLastProvider] = useState<string | null>(null)
	const isLastLogin = lastProvider === provider

	useEffect(() => {
		const renderedProvider = getLastLoginProvider()
		setLastProvider(renderedProvider)
	}, [])

	const handleLogin = async () => {
		setLastLoginProvider(provider)
		await signIn(provider)
	}

	return (
		<div className="relative">
			<SocialLoginButton provider={provider} onClick={handleLogin} />
			{isLastLogin ? <LastLoginTooltip /> : null}
		</div>
	)
}

export function LastLoginTooltip() {
	return (
		<div className="absolute left-6 top-[60px] flex -translate-x-1/2 flex-col items-center justify-center">
			<Image
				src={PolygonImage}
				alt="polygon"
				width={19}
				height={19}
				className="-my-1"
			/>
			<div className="whitespace-nowrap bg-[#CAFB56] px-4 py-[10px] text-sm font-medium">
				마지막으로 로그인했어요!
			</div>
		</div>
	)
}
