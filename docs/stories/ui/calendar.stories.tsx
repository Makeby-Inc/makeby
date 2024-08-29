import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '@design-system/ui'

const meta: Meta<typeof Calendar> = {
	title: 'ui/Calendar',
	component: Calendar
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Primary: Story = {
	render: (props) => (
		<div className="w-[300px] rounded-md border">
			<Calendar {...props} />
		</div>
	),
	name: 'Calendar'
}
