import { ChatSidebar } from '#/me/chats/ui'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { MobileDetailHeader } from '~/shared'

export default async function ChatLayout({
	children
}: {
	children: React.ReactNode
}) {
	const session = await authService.getMySession()
	if (!session) redirect('/start')

	return (
		<>
			<MobileDetailHeader pageTitle="채팅" />
			<section className="scrollbar-hide pc:top-[69px] pc:h-[calc(100vh-69px)] fixed left-1/2 top-[57px] flex h-[calc(100vh-57px)] w-full border-collapse -translate-x-1/2 divide-x overflow-y-scroll border-x px-0">
				<ChatSidebar />
				<div className="flex-1">{children}</div>
			</section>
		</>
	)
}
