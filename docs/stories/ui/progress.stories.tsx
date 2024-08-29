import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@design-system/ui'

const meta: Meta<typeof Progress> = {
	title: 'ui/Progress',
	component: Progress
}

export default meta

type Story = StoryObj<typeof Progress>

export const Primary: Story = {
	render: (props) => (
		<div className="space-y-4">
			<div className="text-lg font-bold">펀딩 진행률</div>
			<Progress {...props} />
			<div className="flex items-center justify-between">
				<span className="text-primary">{props.value}%</span>
				<span>100%</span>
			</div>
		</div>
	),
	name: 'Progress',
	args: {
		value: 50
	}
}
