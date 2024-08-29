import { Toaster } from '@design-system/ui'
import AuthProvider from '@providers/auth/auth-provider'
import type { Metadata } from 'next'
import './globals.css'
import { authService } from '@providers/auth'
import { GlobalFooter, GlobalHeader } from '~/shared'
import { getMakerRegisteredStatusAction } from '#/maker'
import { MobileBottomNavigator } from '~/shared/ui/mobile-bottom-navigator'
import { getChatRooms } from '#/me'

export const metadata: Metadata = {
	metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
	title: {
		default: 'MAKEBY | 메잇바이',
		template: '%s | MAKEBY'
	},
	description:
		'굿즈 중고거래와 메이커 샵을 한 곳에서! 메잇바이에서 중고 굿즈를 사고팔고, 메이커가 제작한 특별한 굿즈를 만나보세요. 편리하고 안전한 거래를 경험해보세요.',
	openGraph: {
		siteName: 'MAKEBY | 메잇바이',
		url: `https://${process.env.VERCEL_URL}`
	}
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const session = await authService.getMySession()
	const isUser = !!session

	let unreadChatCount = 0
	let isMaker = false

	if (isUser) {
		isMaker = !!(await getMakerRegisteredStatusAction())?.data
		const chats = await getChatRooms(session.user.id)
		const data = chats.map((chat) => {
			const isSender = session.user.id === chat.senderUserId
			const unreadCount = chat.messages.filter((message) =>
				isSender ? !message.isSenderRead : !message.isReceiverRead
			).length
			return unreadCount
		})
		unreadChatCount = data.reduce((acc, cur) => acc + cur, 0)
	}

	return (
		<html lang="ko">
			<body>
				<AuthProvider>
					<GlobalHeader
						isMaker={isMaker}
						isUser={isUser}
						unreadChatCount={unreadChatCount}
					/>
					<main className="min-h-screen">{children}</main>
					<GlobalFooter />
					<MobileBottomNavigator />
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	)
}
