import { db } from '@core/models'

export async function getRecommendedProductsAction() {
	const products = await db.recommendedProduct.findMany({
		where: {
			product: {
				status: 'RELEASED'
			}
		},
		include: {
			product: {
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					makerId: true,
					title: true,
					thumbnailUrl: true,
					status: true,
					description: true,
					representativePrice: true,
					categoryId: true,
					tags: true,
					productImages: true,
					productCategory: {
						select: {
							name: true
						}
					},
					maker: {
						select: {
							slug: true,
							name: true,
							businessName: true
						}
					},
					_count: {
						select: {
							reviews: true,
							likes: true
						}
					}
				}
			}
		},
		take: 10
	})
	return products
}
