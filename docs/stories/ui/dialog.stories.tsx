import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@design-system/ui'

const meta: Meta<typeof DialogContent> = {
	title: 'ui/Dialog',
	component: DialogContent
}

export default meta

type Story = StoryObj<typeof DialogContent>

export const Primary: Story = {
	render: (props) => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>open</Button>
			</DialogTrigger>
			<DialogContent {...props}>
				<DialogHeader>
					<DialogTitle>로그인</DialogTitle>
					<DialogDescription>
						로그인하고 데브게이트의 서비스를 이용하세요
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button size="sm" variant="outline">
							닫기
						</Button>
					</DialogClose>
					<Button size="sm">로그인</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	name: 'Dialog',
	args: {
		hideClose: false
	}
}
