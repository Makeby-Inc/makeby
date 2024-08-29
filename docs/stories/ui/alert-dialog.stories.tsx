import type { Meta, StoryObj } from '@storybook/react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button
} from '@design-system/ui'
import { Icon } from '@design-system/icon'

const meta: Meta<typeof AlertDialog> = {
	title: 'ui/AlertDialog',
	component: AlertDialog
}

export default meta

type Story = StoryObj<typeof AlertDialog>

export const Primary: Story = {
	name: 'default',
	render: (props) => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" size="sm">
					게시글 업로드
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>게시글을 업로드하시겠어요?</AlertDialogTitle>
					<AlertDialogDescription>게시글 수정은 불가합니다.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>취소</AlertDialogCancel>
					<AlertDialogAction>업로드하기</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const Secondary: Story = {
	name: 'destructive',
	render: (props) => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="sm">
					<Icon name="TrashIcon" className="h-4 w-4" />
					댓글 삭제
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						정말 댓글을 삭제하시겠어요? 정말이신가요? 다시 한 번 생각해보시겠어요?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>취소</AlertDialogCancel>
					<AlertDialogAction variant="destructive">삭제</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
