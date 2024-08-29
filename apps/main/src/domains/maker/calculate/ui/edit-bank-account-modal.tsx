'use client'
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Form,
	FormField,
	FormFieldItem,
	Input,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	useForm,
	useToast
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useAction } from '@core/react'
import {
	type EditBankAccountDto,
	editBankAccountDto
} from '../model/edit-bank-account-dto'
import { BANK_CODE_LIST } from '../model/bank-code-list.constant'
import { editMyBankAccountAction } from '../action/edit-my-bank-account'

interface EditBankAccountModalProps {
	isNew?: boolean
}

export function EditBankAccountModal({
	isNew = false
}: EditBankAccountModalProps): JSX.Element {
	const actionTitle = `계좌 정보 ${isNew ? '등록' : '수정'}`
	const [open, setOpen] = useState(false)
	const form = useForm<EditBankAccountDto>({
		resolver: zodResolver(editBankAccountDto)
	})
	const { toast } = useToast()

	const editAction = useAction(editMyBankAccountAction, {
		onSuccess: () => {
			setOpen(false)
			toast({
				title: '계좌 정보를 저장했어요',
				variant: 'success'
			})
		},
		onError: () => {
			toast({
				title: '계좌 정보를 저장하는 중 문제가 발생했어요',
				description: '잠시 후 다시 시도해주세요',
				variant: 'destructive'
			})
		}
	})

	const handleSubmit = form.handleSubmit((data) => {
		editAction.execute(data)
	})

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button
					className="w-full whitespace-nowrap"
					size="sm"
					variant={isNew ? 'default' : 'outline'}
				>
					{actionTitle}
				</Button>
			</DialogTrigger>
			<DialogContent hideClose>
				<h3 className="mb-6 text-xl font-semibold">{actionTitle}</h3>
				<Form {...form}>
					<form onSubmit={handleSubmit} className="grid gap-8">
						<FormField
							control={form.control}
							name="bankCode"
							render={({ field }) => (
								<FormFieldItem title="은행">
									<Select
										onValueChange={(value) => {
											field.onChange(value)
											form.setValue(
												'bankName',
												BANK_CODE_LIST.find(({ code }) => code === value)?.name ?? ''
											)
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="은행을 선택해주세요" />
										</SelectTrigger>
										<SelectContent>
											<ScrollArea className="max-h-[200px] overflow-y-auto">
												{BANK_CODE_LIST.map(({ code, name }) => (
													<SelectItem key={code} value={code}>
														{name}
													</SelectItem>
												))}
											</ScrollArea>
										</SelectContent>
									</Select>
								</FormFieldItem>
							)}
						/>
						<FormField
							control={form.control}
							name="accountNumber"
							render={({ field }) => (
								<FormFieldItem title="계좌번호">
									<Input {...field} placeholder="000-000-00000" />
								</FormFieldItem>
							)}
						/>
						<FormField
							control={form.control}
							name="accountHolder"
							render={({ field }) => (
								<FormFieldItem title="예금주">
									<Input {...field} placeholder="홍길동" />
								</FormFieldItem>
							)}
						/>

						<div className="flex gap-2">
							<Button
								type="button"
								size="lg"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								취소
							</Button>
							<Button
								type="submit"
								disabled={editAction.isExecuting}
								size="lg"
								className="flex-1"
							>
								{isNew ? '등록' : '수정'}하기
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
