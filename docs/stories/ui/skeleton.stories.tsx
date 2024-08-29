import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '@design-system/ui'

const meta: Meta<typeof Skeleton> = {
	title: 'ui/Skeleton',
	component: Skeleton
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Primary: Story = {
	render: (props) => <Skeleton className="h-10 w-[200px]"></Skeleton>,
	name: 'Skeleton'
}
