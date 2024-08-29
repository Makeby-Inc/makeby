import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@design-system/ui'

const meta: Meta<typeof Slider> = {
	title: 'ui/Slider',
	component: Slider
}

export default meta

type Story = StoryObj<typeof Slider>

export const Primary: Story = {
	render: (props) => <Slider {...props} />,
	name: 'Slider',
	args: {
		defaultValue: [50]
	}
}
