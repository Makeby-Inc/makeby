import { type Prisma } from '@core/models'

export const popularMakerInclude = {
	maker: {
		select: {
			slug: true,
			name: true,
			businessName: true,
			profileUrl: true
		}
	}
} satisfies Prisma.PopularMakerInclude

export type PopularMaker = Prisma.PopularMakerGetPayload<{
	include: typeof popularMakerInclude
}>
