'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { z } from 'zod'

export const getShopBySlugAction = action
	.metadata({
		actionName: 'getShopBySlug'
	})
	.schema(
		z.object({
			slug: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		const { slug } = parsedInput

		return await db.maker.findUniqueOrThrow({
			where: {
				slug
			},
			select: {
				id: true,
				name: true,
				businessName: true,
				slug: true,
				socialIds: true,
				profileUrl: true
			}
		})
	})
