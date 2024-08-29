import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@design-system/ui'

const meta: Meta<typeof Textarea> = {
	title: 'ui/Textarea',
	component: Textarea
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Primary: Story = {
	render: (props) => <Textarea {...props} />,
	name: 'Textarea',
	args: {
		placeholder: 'Placeholder text',
		disabled: false
	}
}
