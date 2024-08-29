'use client'

import { useAuth } from '@providers/auth'
import { Button } from '@design-system/ui'

export function LogOutButton() {
	const { signOut } = useAuth()

	const handleLogout = async () => {
		await signOut()
	}

	return (
		<Button
			onClick={handleLogout}
			variant="outline"
			className="text-secondary-foreground border-strong w-fit font-semibold"
		>
			로그아웃
		</Button>
	)
}
