import { GlobalSidebar } from '~/shared/ui'

export function FAQNoticeSidebar() {
	return (
		<GlobalSidebar
			title="고객센터"
			data={[
				{ label: '자주 묻는 질문', href: '/faqs' },
				{ label: '공지사항', href: '/notices' }
			]}
		/>
	)
}
