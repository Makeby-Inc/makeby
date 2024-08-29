import { type z } from 'zod'
import { individualMakerRegisterDto } from '#/maker/_model/individual-maker-register-dto'

export const individualMakerEditDto = individualMakerRegisterDto.omit({
	plan: true,
	makerType: true
})

export type IndividualMakerEditDto = z.infer<typeof individualMakerEditDto>
