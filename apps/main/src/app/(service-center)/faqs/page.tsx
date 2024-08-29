import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import { FaqGridMenu, getFaq, getFaqCategories } from '#/admin-content'
import Link from 'next/link'

export default async function FaqPage() {
	const [faqData, faqCategory] = await Promise.all([
		getFaq(),
		getFaqCategories()
	])
	return (
		<div className="w-full">
			<div className="flex w-full flex-col items-center gap-6">
				<div className="pc:block border-primary hidden w-full gap-[10px] border-b-2 pb-4 text-2xl font-semibold">
					자주 묻는 질문
				</div>
				<FaqGridMenu data={faqData} categories={faqCategory} />
				<div className="bg-primary/10 pc:flex-row pc:gap-10 pc:justify-between flex w-full flex-col items-center justify-start gap-4 rounded-lg px-6 py-5">
					<div className="flex w-full items-center gap-2">
						<Icon name="ExclamationCircleIcon" className="text-primary" solid />
						<div className="text-primary text-sm">
							메잇바이와 관련한 더욱 자세한 내용을 알고 싶을 때 언제나 문의해 주세요!
						</div>
					</div>
					<Link
						href="https://pf.kakao.com/_gGhXG"
						className="pc:w-fit w-full shrink-0"
					>
						<Button size="sm" className="pc:w-fit w-full">
							1:1 문의하기
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
