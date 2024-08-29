import { Icon } from '@design-system/icon'
import Link from 'next/link'

export function MakerLandingButton() {
	return (
		<Link href="/maker/register">
			<div className="bg-primary pc:p-10 flex w-full items-end justify-between rounded-xl border p-6">
				<div className="pc:text-3xl text-background text-lg font-semibold">
					<div>굿즈 작가님을 위한 올인원 서비스,</div>
					<div>메잇바이에서 경험하세요</div>
				</div>
				<Icon name="ArrowRightIcon" className="text-background h-6 w-6" />
			</div>
		</Link>
	)
}
