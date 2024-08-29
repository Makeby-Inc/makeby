import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@design-system/ui'

const meta: Meta<typeof Tooltip> = {
	title: 'ui/Tooltip',
	component: Tooltip
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Primary: Story = {
	render: (props) => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline">Hover</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>리모트 워크의 줄임말이랍니당</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	),
	name: 'Tooltip'
}
