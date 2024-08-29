import { Button } from '@design-system/ui'
import Link from 'next/link'

export function MobileBottomButton() {
	return (
		<div className="pc:hidden fixed inset-x-0 bottom-0 p-4">
			<Link href="/maker/register">
				<Button size="lg" className="w-full">
					메이커 신청하기
				</Button>
			</Link>
		</div>
	)
}
