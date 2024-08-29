import type { Meta, StoryObj } from '@storybook/react'
import { Button, Label } from '@design-system/ui'

const meta: Meta<typeof Label> = {
	title: 'ui/Label',
	component: Label
}

export default meta

type Story = StoryObj<typeof Label>

export const Primary: Story = {
	render: ({ children, ...props }) => (
		<Label {...props}>
			<Button>hello</Button>
		</Label>
	),
	name: 'Label',
	args: {
		title: 'Title',
		guideText: 'Guide Text'
	}
}
