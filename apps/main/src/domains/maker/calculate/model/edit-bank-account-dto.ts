import { z } from 'zod'

export const editBankAccountDto = z.object({
	bankCode: z.string({
		message: '은행을 선택해주세요'
	}),
	bankName: z.string(),
	accountNumber: z.string({
		message: '계좌번호를 입력해주세요'
	}),
	accountHolder: z.string({
		message: '예금주를 입력해주세요'
	})
})

export type EditBankAccountDto = z.infer<typeof editBankAccountDto>
