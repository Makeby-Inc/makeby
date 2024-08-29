'use client'

import { useAction } from '@core/react'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useToast
} from '@design-system/ui'
import { KAKAO_HELP_URL } from '~/shared'
import { deleteRoomAction } from '../action/delete-room'

interface ChatControlPopoverProps {
	roomId: string
}

export function ChatControlPopover({ roomId }: ChatControlPopoverProps) {
	const { toast } = useToast()
	const deleteAction = useAction(deleteRoomAction, {
		onSuccess: () => {
			toast({
				title: '채팅방을 삭제했어요',
				variant: 'success'
			})
		}
	})

	const handleDelete = () => {
		const confirmed = confirm('정말로 삭제하시겠어요?')
		if (confirmed) {
			deleteAction.execute({ roomId })
		}
	}

	const handleReport = () => {
		alert('화면을 캡쳐하고 신고 내용을 알려주세요')
		window.open(KAKAO_HELP_URL, '_blank')
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button type="button">
					<Icon name="EllipsisVerticalIcon" />
				</button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-[150px] !gap-0 rounded-sm !p-1">
				<OptionItem onClick={handleDelete}>삭제하기</OptionItem>
				<OptionItem onClick={handleReport}>신고하기</OptionItem>
			</PopoverContent>
		</Popover>
	)
}

interface OptionItemProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	asChild?: boolean
}

function OptionItem({
	children,
	className,
	asChild,
	...props
}: OptionItemProps) {
	return (
		<Button
			variant="ghost"
			className={cn(
				'h-fit w-full justify-start rounded-sm !px-3 !py-2 text-sm font-medium',
				className
			)}
			asChild={asChild}
			{...props}
		>
			{children}
		</Button>
	)
}
