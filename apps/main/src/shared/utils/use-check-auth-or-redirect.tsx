'use client'

import { useToast } from '@design-system/ui'
import { useAuth } from '@providers/auth'
import { useRouter } from 'next/navigation'

interface RedirectOptions {
	nextPath?: string
}

export function useCheckAuthOrRedirect({ nextPath = '/' }: RedirectOptions) {
	const { isAuthenticated } = useAuth()
	const { toast } = useToast()
	const router = useRouter()
	const url = `/start?nextPath=${encodeURIComponent(nextPath)}`

	function checkAuthOrRedirect() {
		if (isAuthenticated) return true

		toast({
			title: '로그인이 필요해요',
			description: '로그인 후 이용해주세요',
			variant: 'destructive'
		})

		router.push(url)

		return false
	}

	return { checkAuthOrRedirect, isAuthenticated }
}
