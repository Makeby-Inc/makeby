import type { Meta, StoryObj } from '@storybook/react'
import {
	Header,
	HeaderActions,
	HeaderLeading,
	HeaderNav,
	HeaderTitle
} from '@design-system/template'
import { Icon } from '@design-system/icon'
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

const meta: Meta<typeof Header> = {
	title: 'Template/Header',
	component: Header
}

export default meta

type Story = StoryObj<typeof Header>

const menuTabs = [
	{ label: '홈', href: '/' },
	{ label: '예약', href: '/book' },
	{ label: '리뷰', href: '/review' },
	{ label: '정산', href: '/calc' }
]

export const Primary: Story = {
	render: (props) => (
		<Header>
			<HeaderLeading className="pc:py-0">
				<div className="mr-2xl h-10 w-40 shrink-0 bg-black text-white">logo</div>
				<HeaderNav data={menuTabs} />
			</HeaderLeading>
			<HeaderActions>
				<Icon name="UserIcon" className="h-6 w-6" />
			</HeaderActions>
		</Header>
	),
	name: 'Desktop - example1'
}

export const Secondary: Story = {
	render: (props) => (
		<Header>
			<HeaderLeading className="pc:py-0">
				<div className="mr-2xl h-10 w-40 shrink-0 bg-black text-white">logo</div>
				<HeaderNav data={menuTabs} />
			</HeaderLeading>
			<HeaderActions>
				<Button>시작하기</Button>
			</HeaderActions>
		</Header>
	),
	name: 'Desktop - example2'
}

export const Tertiary: Story = {
	render: (props) => (
		<div className="w-full">
			<div>화면을 줄여주세요</div>
			<Header>
				<HeaderLeading className="pc:py-0" showBackButton>
					<div className="mr-2xl h-10 w-40 shrink-0 bg-black text-white">logo</div>
					<HeaderNav data={menuTabs} />
				</HeaderLeading>
				<HeaderTitle>Page Title</HeaderTitle>
				<HeaderActions>
					<Sheet>
						<SheetTrigger asChild>
							<Icon name="Bars3Icon" className="h-6 w-6" />
						</SheetTrigger>
						<SheetContent>
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
				</HeaderActions>
			</Header>
		</div>
	),
	name: 'Mobile - example1'
}
