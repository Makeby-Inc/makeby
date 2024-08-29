import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@design-system/ui'

const meta: Meta<typeof Card> = {
	title: 'ui/Card',
	component: Card
}

export default meta

type Story = StoryObj<typeof Card>

export const Primary: Story = {
	render: (props) => (
		<div className="space-y-lg">
			<Card>
				<CardHeader>
					<CardTitle>구매 전 확인해주세요</CardTitle>
				</CardHeader>
				<CardContent className="text-secondary-foreground">
					레인부츠 | 28,000원
					<br />
					머리핀 | 20,000원
				</CardContent>
				<CardFooter>
					<Button size="sm" className="w-full">
						50,000원 구매하기
					</Button>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>추천 아티클</CardTitle>
					<CardDescription>오늘의 추천 아티클을 확인하세요</CardDescription>
				</CardHeader>
				<CardContent>
					<img src="https://placehold.co/600x400" alt="" />
					<div>
						<div className="text-lg font-bold">사람은 왜 꿈을 꾸나요?</div>
						<div className="text-secondary-foreground text-sm font-medium">
							sophie kim 저 · 김승현 번역
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	),
	name: 'Card'
}
