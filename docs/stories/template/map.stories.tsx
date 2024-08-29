import { Map } from '@design-system/template'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Map> = {
	title: 'Template/Map',
	component: Map
}

export default meta

type Story = StoryObj<typeof Map>

export const Primary: Story = {
	render: (props) => <Map value="경기도 성남시 분당구 판교역로 166" />,
	name: 'Map',
	args: {
		children: 'Map'
	}
}
