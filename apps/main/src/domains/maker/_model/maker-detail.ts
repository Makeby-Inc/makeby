import { type Prisma } from '@core/models'

export const makerDetailInclude = {
	socialIds: {
		select: {
			id: true,
			type: true,
			socialId: true,
			isPrimary: true
		}
	},
	files: true
} satisfies Prisma.MakerInclude

export type MakerDetail = Prisma.MakerGetPayload<{
	include: typeof makerDetailInclude
}>
