import { Prisma } from '@core/models'

export const USER_INFORMATION_SELECT_CONFIG =
	Prisma.validator<Prisma.UserSelect>()({
		name: true,
		totalPoint: true,
		birthDate: true,
		image: true,
		isMessageSubscribed: true,
		isEmailSubscribed: true,
		phoneNumber: true,
		maker: {
			select: {
				id: true
			}
		}
	})

export type UserInformationDto = Prisma.UserGetPayload<{
	select: typeof USER_INFORMATION_SELECT_CONFIG
}>
