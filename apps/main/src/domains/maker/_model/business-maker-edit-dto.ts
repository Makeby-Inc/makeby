import { type z } from 'zod'
import { businessMakerRegisterDto } from '#/maker/_model/business-maker-register-dto'

export const businessMakerEditDto = businessMakerRegisterDto.omit({
	plan: true,
	makerType: true
})

export type BusinessMakerEditDto = z.infer<typeof businessMakerEditDto>
