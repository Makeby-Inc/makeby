'use server'

import { db } from '@core/models'

export async function getBannerImagesAction() {
	const banners = await db.landingCarouselImage.findMany({
		select: {
			imageUrl: true,
			link: true
		}
	})
	return banners
}
