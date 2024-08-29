import { db, Prisma } from '@core/models'

export const FAQ_SELECT_CONFIG = Prisma.validator<Prisma.FaqSelect>()({
	categoryId: true,
	title: true,
	description: true,
	faqCategory: {
		select: {
			name: true
		}
	}
})

export type FaqData = Prisma.FaqGetPayload<{
	select: typeof FAQ_SELECT_CONFIG
}>

export async function getFaq() {
	return await db.faq.findMany({
		select: FAQ_SELECT_CONFIG
	})
}
