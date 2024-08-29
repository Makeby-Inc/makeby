import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@design-system/ui'

const meta: Meta<typeof Drawer> = {
	title: 'Ui/Drawer',
	component: Drawer
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Primary: Story = {
	render: (props) => (
		<Drawer>
			<DrawerTrigger>
				<Button variant="outline">Open</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button>Submit</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
	name: 'Drawer'
}
