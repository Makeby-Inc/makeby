'use client'

import { cn } from '@core/utils'
import { Footer, FooterDescription, FooterMenu } from '@design-system/template'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '../lib'

export function GlobalFooter() {
	const currentPath = usePathname()
	const pathsToHide = ['/me/chats']
	const shouldHide = pathsToHide.some((path) => currentPath.startsWith(path))

	return (
		<Footer className={cn(shouldHide && 'hidden')}>
			<div />
			<FooterDescription
				data={[
					{
						label: '상호명',
						value: '(주)메잇바이'
					},
					{
						label: '사업자등록번호',
						value: '854-87-02764'
					},
					{
						label: '통신판매업신고번호',
						value: '제2023-인천부평-3247호'
					},
					{
						label: '대표',
						value: '우지은'
					},
					{
						label: '주소',
						value:
							'경기도 부천시 원미구 부천로198번길 18 춘의테크노파크2차 202동 1514호'
					},
					{
						label: '고객센터',
						value: '0507-1397-0743'
					}
				]}
			/>
			<div className="text-secondary-foreground grid gap-2 font-medium underline underline-offset-2">
				<Link
					className="hover:text-foreground"
					href={PRIVACY_POLICY_URL}
					target="_blank"
				>
					개인정보처리방침
				</Link>
				<Link
					className="hover:text-foreground"
					href={TERMS_OF_SERVICE_URL}
					target="_blank"
				>
					이용약관
				</Link>
			</div>
		</Footer>
	)
}
