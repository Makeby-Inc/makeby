import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '@design-system/ui'

const meta: Meta<typeof Separator> = {
	title: 'ui/Separator',
	component: Separator
}

export default meta

type Story = StoryObj<typeof Separator>

export const Primary: Story = {
	render: (props) => <Separator {...props} />,
	name: 'Separator',
	args: {
		orientation: 'horizontal'
	}
}
