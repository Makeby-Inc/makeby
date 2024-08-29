import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertDescription, AlertTitle } from '@design-system/ui'

const meta: Meta<typeof Alert> = {
	title: 'ui/Alert',
	component: Alert
}

export default meta

type Story = StoryObj<typeof Alert>

export const Primary: Story = {
	name: 'default',
	render: (props) => (
		<Alert icon="BellAlertIcon" {...props}>
			<AlertTitle>저장이 완료됐어요</AlertTitle>
			<AlertDescription>
				마이페이지에서 확인할 수 있어요. 확인되지 않는 경우 고객센터로 문의해주세요.
			</AlertDescription>
		</Alert>
	)
}

export const LongTitle: Story = {
	name: '긴 제목',
	render: (props) => (
		<Alert icon="BellAlertIcon">
			<AlertTitle>
				제목 텍스트가 길어지면 이렇게 보여집니다. 두 줄 이상로 길어지는 경우를
				참고해주세요.
			</AlertTitle>
			<AlertDescription>설명이 들어갑니다.</AlertDescription>
		</Alert>
	)
}

export const OnlyTitle: Story = {
	name: '제목만',
	render: (props) => (
		<Alert icon="BellAlertIcon">
			<AlertTitle>제목만 사용되는 경우가 있습니다.</AlertTitle>
		</Alert>
	)
}

export const Destructive: Story = {
	name: '경고',
	render: (props) => (
		<Alert icon="ShieldExclamationIcon" variant="destructive">
			<AlertTitle>경고성 알럿</AlertTitle>
			<AlertDescription>설명이 들어갑니다.</AlertDescription>
		</Alert>
	)
}
