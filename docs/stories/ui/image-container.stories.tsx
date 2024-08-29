import type { Meta, StoryObj } from '@storybook/react'
import { ImageContainer } from '@design-system/ui'

const meta: Meta<typeof ImageContainer> = {
	title: 'ui/ImageContainer',
	component: ImageContainer
}

export default meta

type Story = StoryObj<typeof ImageContainer>

export const Primary: Story = {
	render: (props) => (
		<ImageContainer
			src="https://picsum.photos/200"
			alt=""
			width={200}
			height={200}
		/>
	),
	name: 'ImageContainer'
}
