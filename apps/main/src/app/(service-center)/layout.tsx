import { FAQNoticeSidebar } from '#/admin-content'
import { MobileDetailHeader, MobileTab } from '~/shared'

interface ServiceCenterLayoutProps {
	children?: React.ReactNode
}

const data = [
	{ label: '자주 묻는 질문', href: '/faqs' },
	{ label: '공지사항', href: '/notices' }
]

export const metadata = {
	title: '고객센터'
}

export default function ServiceCenterLayout({
	children
}: ServiceCenterLayoutProps) {
	return (
		<section>
			<div>
				<MobileDetailHeader pageTitle="고객센터" />
				<MobileTab data={data} />
				<div className="pc:px-[100px] pc:py-[60px] flex gap-10 p-6">
					<FAQNoticeSidebar />
					<div className="flex w-full flex-col items-center">{children}</div>
				</div>
			</div>
		</section>
	)
}
