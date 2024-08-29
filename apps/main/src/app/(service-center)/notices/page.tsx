import { getNotices, NoticeItem, NoticeEmpty } from '#/admin-content'

export default async function NoticePage() {
	const noticeData = await getNotices()

	return (
		<div className="flex w-full flex-col items-center">
			<div className="pc:block border-primary hidden w-full gap-[10px] border-b-2 pb-4 text-2xl font-semibold">
				공지사항
			</div>
			{noticeData.length !== 0 ? (
				<div className="w-full">
					{noticeData.map((notice) => (
						<NoticeItem key={notice.id} notice={notice} showContent={false} />
					))}
				</div>
			) : (
				<NoticeEmpty />
			)}
		</div>
	)
}
