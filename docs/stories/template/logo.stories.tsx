import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from '@design-system/template'

const meta: Meta<typeof Logo> = {
	title: 'Template/Logo',
	component: Logo
}

export default meta

type Story = StoryObj<typeof Logo>

export const Primary: Story = {
	render: (props) => <Logo />,
	name: 'Logo'
}
