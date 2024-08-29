import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@design-system/ui'

const meta: Meta<typeof SheetContent> = {
	title: 'ui/Sheet',
	component: SheetContent
}

export default meta

type Story = StoryObj<typeof SheetContent>

export const Primary: Story = {
	render: (props) => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<SheetContent {...props}>
				<SheetHeader>
					<SheetTitle>프로필 설정</SheetTitle>
					<SheetDescription>
						서비스 유저들에게 보여지는 프로필을 수정하세요
					</SheetDescription>
				</SheetHeader>
				<div>안녕하세요</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button size="sm" variant={'outline'}>
							Cancel
						</Button>
					</SheetClose>
					<Button size="sm">Save</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
	name: 'default',
	args: {
		side: 'right',
		hideClose: false
	}
}
export const Overflow: Story = {
	render: (props) => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<SheetContent {...props}>
				<SheetHeader>
					<SheetTitle>프로필 설정</SheetTitle>
					<SheetDescription>
						서비스 유저들에게 보여지는 프로필을 수정하세요
					</SheetDescription>
				</SheetHeader>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<div>안녕하세요</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button size="sm" variant={'outline'}>
							Cancel
						</Button>
					</SheetClose>
					<Button size="sm">Save</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
	name: 'overflow',
	args: {
		side: 'right',
		hideClose: false
	}
}
