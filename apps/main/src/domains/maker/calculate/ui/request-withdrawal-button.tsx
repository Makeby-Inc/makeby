'use client'

import { useAction } from '@core/react'
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	useToast
} from '@design-system/ui'
import { requestWithdrawal } from '../action/request-withdrawal'

interface RequestWithdrawalButtonProps {
	disabled: boolean
	className?: string
}

export function RequestWithdrawalButton({
	disabled,
	className
}: RequestWithdrawalButtonProps): JSX.Element {
	const { toast } = useToast()
	const requestAction = useAction(requestWithdrawal, {
		onSuccess: () => {
			toast({
				title: '출금 신청을 완료했어요',
				description: '관리자가 확인 후 요청하신 금액을 입금해드릴 예정이에요',
				variant: 'success'
			})
		}
	})
	const handleClick = () => {
		requestAction.execute()
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						className="w-full whitespace-nowrap"
						onClick={handleClick}
						size="sm"
						variant="outline"
						disabled={disabled || requestAction.isExecuting}
					>
						출금 신청
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>1,000원 이상부터 출금 가능합니다.</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
