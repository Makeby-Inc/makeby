'use client'
import { type MakerBankAccount } from '@core/models'
import { cn } from '@core/utils'
import { EditBankAccountModal } from './edit-bank-account-modal'
import { RequestWithdrawalButton } from './request-withdrawal-button'

interface AvailableWithdrawalSummaryProps {
	bankAccount?: MakerBankAccount | null
	availableWithdrawalAmount: number
	className?: string
}

export function AvailableWithdrawalSummary({
	bankAccount,
	availableWithdrawalAmount,
	className
}: AvailableWithdrawalSummaryProps): JSX.Element {
	const bankAccountText = bankAccount
		? `${bankAccount.bankName} ${bankAccount.accountNumber}`
		: '출금계좌를 등록해주세요'

	return (
		<div
			className={cn(
				'bg-secondary pc:p-10 grid gap-4 rounded-2xl border p-6',
				className
			)}
		>
			<div className="pc:flex pc:justify-between pc:items-center grid gap-2">
				<div className="pc:gap-4 grid gap-1">
					<div>
						<h1 className="pc:text-lg text-sm font-semibold">출금 가능 금액</h1>
						<p className="text-secondary-foreground pc:text-base text-xs">
							{bankAccountText}
						</p>
					</div>
					<div className="pc:text-2xl text-xl font-bold">
						{availableWithdrawalAmount.toLocaleString()}원
					</div>
				</div>

				<div className="max-pc:w-full flex gap-2">
					<EditBankAccountModal isNew={!bankAccount} />
					<RequestWithdrawalButton disabled={availableWithdrawalAmount < 1000} />
				</div>
			</div>
		</div>
	)
}
