import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@design-system/ui'

const meta: Meta<typeof Input> = {
	title: 'ui/Input',
	component: Input
}

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
	render: (props) => <Input {...props} />,
	name: 'Input',
	args: {
		placeholder: 'Placeholder text',
		disabled: false
	}
}
