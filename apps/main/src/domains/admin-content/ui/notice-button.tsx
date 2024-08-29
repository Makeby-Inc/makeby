import { Button } from '@design-system/ui'
import Link from 'next/link'

export function NoticeButton() {
	return (
		<Link href="/notices">
			<Button className="w-fit" variant="outline">
				목록 보기
			</Button>
		</Link>
	)
}
