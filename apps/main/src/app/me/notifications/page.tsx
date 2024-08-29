import { NotificationList } from '#/me'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '내 알림 내역'
}

export default function MyNotificationPage() {
	return (
		<>
			<MobileDetailHeader pageTitle="알림" fallbackUrl="/me" />
			<section className="pc:max-w-[500px] py-4">
				<h2 className="max-pc:hidden mb-4 text-2xl font-medium">내 알림 내역</h2>
				<NotificationList />
			</section>
		</>
	)
}
