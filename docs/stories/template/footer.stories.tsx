import type { Meta, StoryObj } from '@storybook/react'
import {
	Footer,
	FooterDescription,
	FooterMenu,
	FooterInfo
} from '@design-system/template'
import { Button } from '@design-system/ui'

const INFO_DATA = [
	{ label: '제목', value: '콘텐츠' },
	{ label: '사업자등록번호', value: '000-00-00000' },
	{ label: '대표', value: '홍길동' },
	{ label: '주소', value: '서울시 서울구 서울로 1길 1' }
]

const NAV_DATA = [
	{
		label: 'Shop',
		links: [
			{ title: '아우터', link: '/shop/outer' },
			{ title: '원피스', link: '/shop/one-piece' },
			{ title: '하의', link: '/shop/bottom' },
			{ title: '상의', link: '/shop/top' }
		]
	},
	{
		label: 'NEW',
		links: [
			{ title: '24 SS', link: '/new/ss' },
			{ title: '24 FW', link: '/new/fw' }
		]
	},
	{
		label: 'MyPage',
		links: [
			{ title: '내 정보', link: '/my-page' },
			{ title: '배송조회', link: '/my-page/order' },
			{ title: '포인트', link: '/my-page/point' }
		]
	},
	{
		label: 'More',
		links: [
			{ title: '개인정보처리방침', link: '/privacy' },
			{ title: '서비스이용약관', link: '/terms' },
			{ title: '회사 소개', link: '/about' }
		]
	}
]

const meta: Meta<typeof Footer> = {
	title: 'Template/Footer',
	component: Footer
}

export default meta

type Story = StoryObj<typeof Footer>

export const Primary: Story = {
	render: (props) => (
		<Footer>
			<FooterInfo>
				<FooterDescription data={INFO_DATA} />
			</FooterInfo>
			<FooterMenu data={NAV_DATA} />
		</Footer>
	),
	name: 'Footer'
}
