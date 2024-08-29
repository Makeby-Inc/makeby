import { getDetailNotices, NoticeItem, NoticeButton } from '#/admin-content'

interface NoticeDetailPageProps {
	params: {
		id: number
	}
}

export default async function NoticeDetailPage({
	params
}: NoticeDetailPageProps) {
	const notice = await getDetailNotices(params.id)

	return (
		<div className="flex w-full flex-col items-center gap-6">
			<div className="w-full">
				<div className="max-pc:hidden border-primary gap-[10px] border-b-2 pb-4 text-2xl font-semibold">
					공지사항
				</div>
				<NoticeItem notice={notice} showContent />
			</div>
			<NoticeButton />
		</div>
	)
}
