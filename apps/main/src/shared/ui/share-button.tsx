'use client'

import { clipboard } from '@core/utils'
import { Icon } from '@design-system/icon'
import { useToast } from '@design-system/ui'
import { usePathname } from 'next/navigation'
import { SITE_URL } from '~/shared/lib'

interface ShareButtonProps {
	title?: string
	path?: string
}

export function ShareButton({
	title = '메잇바이',
	path = '/'
}: ShareButtonProps): JSX.Element {
	const currentPath = usePathname()
	const { toast } = useToast()

	function onClick() {
		const url = SITE_URL + currentPath

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (navigator?.share) {
			navigator
				.share({
					title,
					url
				})
				.catch(() => {
					console.error('공유하기를 지원하지 않는 브라우저입니다.')
				})
		} else {
			toast({
				title: '링크를 복사했어요!'
			})
			clipboard.writeText(url).catch(() => {
				console.error('링크 복사에 실패했어요.')
			})
		}
	}

	return (
		<button type="button" onClick={onClick} className="h-6 w-6">
			<Icon name="ShareIcon" solid />
		</button>
	)
}
