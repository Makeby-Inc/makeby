import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, Label } from '@design-system/ui'

const meta: Meta<typeof Checkbox> = {
	title: 'ui/Checkbox',
	component: Checkbox
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
	render: (props) => (
		<div className="space-y-md">
			<Label
				title="서비스 알림 받기"
				guideText="이용에 도움되는 알림을 받습니다"
				direction="left"
			>
				<Checkbox />
			</Label>
			<Label
				title="제목이 길어지는 경우는 이렇게 표시됩니다. 참고해주세요"
				guideText="가이드가 길어지는 경우는 이렇게 표시됩니다. 참고해주세요."
				direction="left"
			>
				<Checkbox />
			</Label>
		</div>
	),
	name: 'Checkbox'
}
