import type { Meta, StoryObj } from '@storybook/react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from '@design-system/ui'
import { Icon } from '@design-system/icon'

const meta: Meta<typeof Command> = {
	title: 'ui/Command',
	component: Command
}

export default meta

type Story = StoryObj<typeof Command>

export const Primary: Story = {
	render: (props) => (
		<Command className="border-input border shadow-lg">
			<CommandInput placeholder="원하는 기능을 검색하세요" />
			<CommandList>
				<CommandEmpty>검색 결과가 없어요...</CommandEmpty>
				<CommandGroup heading="추천 기능">
					<CommandItem>
						<Icon name="CalendarDaysIcon" className="h-4 w-4" />
						<span>캘린더</span>
					</CommandItem>
					<CommandItem>
						<Icon name="FaceSmileIcon" className="h-4 w-4" />
						<span>이모지</span>
					</CommandItem>
					<CommandItem>
						<Icon name="TableCellsIcon" className="h-4 w-4" />
						<span>표</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="기본 블록">
					<CommandItem disabled>
						<Icon name="Bars3CenterLeftIcon" className="h-4 w-4" />
						<span>텍스트</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Icon name="DocumentIcon" className="h-4 w-4" />
						<span>페이지</span>
						<CommandShortcut>⌘B</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Icon name="CheckCircleIcon" className="h-4 w-4" />
						<span>투두 리스트</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	),
	name: 'Command'
}
