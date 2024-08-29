import { yymmdd } from '@core/utils'
import { Separator } from '@design-system/ui'
import Link from 'next/link'

interface Notice {
	id: number
	createdAt: Date
	updatedAt: Date
	orderIndex: number
	title: string
	content: string
}

interface NoticeItemProps {
	notice: Notice | null
	showContent?: boolean
}

export function NoticeItem({ notice, showContent }: NoticeItemProps) {
	return (
		<Link key={notice?.id} href={`/notices/${notice?.id}`}>
			<div className="flex flex-col gap-1 py-6">
				<div className="text-secondary-foreground text-xs font-medium">
					{notice?.createdAt ? yymmdd(notice.createdAt) : '날짜 정보 없음'}
				</div>
				<div className="font-medium">{notice?.title}</div>
			</div>

			<Separator />
			{showContent ? (
				<div className="whitespace-pre-line break-keep pt-6">{notice?.content}</div>
			) : null}
		</Link>
	)
}
