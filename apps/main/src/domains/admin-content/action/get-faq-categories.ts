import { db, Prisma } from '@core/models'

export const FAQ_CATEGORY_SELECT_CONFIG = Prisma.validator<Prisma.FaqSelect>()({
	faqCategory: {
		select: {
			name: true,
			slug: true,
			orderIndex: true
		}
	}
})

export async function getFaqCategories() {
	const faqs = await db.faq.findMany({
		select: FAQ_CATEGORY_SELECT_CONFIG,
		orderBy: {
			faqCategory: {
				orderIndex: 'asc'
			}
		}
	})
	const categories = faqs.map((faq) => faq.faqCategory.name)
	const categoryNames = Array.from(new Set(categories))
	categoryNames.unshift('전체')
	return categoryNames
}
