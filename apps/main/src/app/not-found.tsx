import { Button } from '@design-system/ui'
import Link from 'next/link'

export default function GlobalNotFoundPage() {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<section className="gap-md grid items-center">
				<h1 className="text-2xl font-medium">존재하지 않는 페이지입니다.</h1>
				<Button asChild>
					<Link href="/">홈으로 가기</Link>
				</Button>
			</section>
		</div>
	)
}
