import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@design-system/ui'
import { Icon } from '@design-system/icon'

const meta: Meta<typeof DropdownMenu> = {
	title: 'ui/DropdownMenu',
	component: DropdownMenu
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Primary: Story = {
	render: (props) => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Icon name="ShieldCheckIcon" className="h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon name="ShieldCheckIcon" className="h-4 w-4" />
						<span>Billing</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon name="ShieldCheckIcon" className="h-4 w-4" />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon name="ShieldCheckIcon" className="h-4 w-4" />
						<span>Keyboard shortcuts</span>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Icon name="ShieldCheckIcon" className="h-4 w-4" />
						<span>Team</span>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<Icon name="ShieldCheckIcon" className="h-4 w-4" />
							<span>Invite users</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>
									<Icon name="ShieldCheckIcon" className="h-4 w-4" />
									<span>Email</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icon name="ShieldCheckIcon" className="h-4 w-4" />
									<span>Message</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Icon name="ShieldCheckIcon" className="h-4 w-4" />
									<span>More...</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						<Icon name="ShieldCheckIcon" className="h-4 w-4" />
						<span>New Team</span>
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Icon name="ShieldCheckIcon" className="h-4 w-4" />
					<span>GitHub</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Icon name="ShieldCheckIcon" className="h-4 w-4" />

					<span>Support</span>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<Icon name="ShieldCheckIcon" className="h-4 w-4" />

					<span>API</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Icon name="ShieldCheckIcon" className="h-4 w-4" />

					<span>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	name: 'DropdownMenu'
}
