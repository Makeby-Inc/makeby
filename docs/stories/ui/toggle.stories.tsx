import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '@design-system/ui'

const meta: Meta<typeof Toggle> = {
	title: 'ui/Toggle',
	component: Toggle
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Primary: Story = {
	render: ({ icon = 'ShieldCheckIcon', ...props }) => (
		<Toggle icon={icon} {...props}></Toggle>
	),
	name: 'Toggle',
	args: {
		children: 'text'
	}
}
