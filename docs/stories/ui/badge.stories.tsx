import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@design-system/ui'

const meta: Meta<typeof Badge> = {
	title: 'ui/Badge',
	component: Badge
}

export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = {
	render: (props) => <Badge {...props} />,
	name: 'Badge',
	args: {
		children: 'Badge'
	}
}
