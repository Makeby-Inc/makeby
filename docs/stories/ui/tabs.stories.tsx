import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@design-system/ui'

const meta: Meta<typeof TabsList> = {
	title: 'ui/Tabs',
	component: TabsList
}

export default meta

type Story = StoryObj<typeof TabsList>

export const Primary: Story = {
	render: (props) => (
		<Tabs defaultValue="a">
			<TabsList {...props}>
				<TabsTrigger value="a">상세정보</TabsTrigger>
				<TabsTrigger value="b">댓글 12</TabsTrigger>
				<TabsTrigger value="c">자주 묻는 질문</TabsTrigger>
				<TabsTrigger value="d">그냥</TabsTrigger>
			</TabsList>
			<TabsContent value="a">이게 상세정보입니다.</TabsContent>
			<TabsContent value="b">요기는 댓글이에요.</TabsContent>
			<TabsContent value="c">이건 자주 묻는 질문이에요.</TabsContent>
		</Tabs>
	),
	name: 'fill container',
	args: {
		type: 'fill'
	}
}

export const Secondary: Story = {
	render: (props) => (
		<Tabs defaultValue="a">
			<TabsList {...props}>
				<TabsTrigger value="a">여성</TabsTrigger>
				<TabsTrigger value="b">남성</TabsTrigger>
				<TabsTrigger value="c">공용</TabsTrigger>
			</TabsList>
			<TabsContent value="a">여성복입니다.</TabsContent>
			<TabsContent value="b">남성복입니다.</TabsContent>
			<TabsContent value="c">공용입니다.</TabsContent>
		</Tabs>
	),
	name: 'hug contents',
	args: {
		type: 'default'
	}
}
