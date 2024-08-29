import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@design-system/ui'

const meta: Meta<typeof Switch> = {
	title: 'ui/Switch',
	component: Switch
}

export default meta

type Story = StoryObj<typeof Switch>

export const Primary: Story = {
	render: (props) => <Switch {...props} />,
	name: 'Switch',
	args: {
		disabled: false
	}
}
