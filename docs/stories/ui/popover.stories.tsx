import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger
} from '@design-system/ui'

const meta: Meta<typeof Popover> = {
	title: 'ui/Popover',
	component: Popover
}

export default meta

type Story = StoryObj<typeof Popover>

export const Primary: Story = {
	render: (props) => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">크기 설정</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>크기 설정</PopoverTitle>
					<PopoverDescription>컴포넌트의 크기를 설정해주세요</PopoverDescription>
				</PopoverHeader>
				<div>난 팝오버야</div>
			</PopoverContent>
		</Popover>
	),
	name: 'Popover'
}
