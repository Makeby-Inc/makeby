export function NoticeEmpty() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<div className="text-secondary-foreground flex w-full items-center justify-center text-xl font-semibold">
				현재 등록된 공지사항이 없어요
			</div>
			<div className="text-muted-foreground flex w-full items-center justify-center font-medium">
				새로운 공지사항이 등록되면 여기에 표시 돼요
			</div>
		</div>
	)
}
