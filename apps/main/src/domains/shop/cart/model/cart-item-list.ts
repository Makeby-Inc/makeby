import { type Prisma } from '@core/models'

export const cartItemInclude = {
	option: {
		include: {
			product: {
				select: {
					maker: {
						select: {
							name: true,
							businessName: true,
							slug: true,
							profileUrl: true
						}
					}
				}
			}
		}
	}
} satisfies Prisma.ShoppingCartItemInclude

export type CartItem = Prisma.ShoppingCartItemGetPayload<{
	include: typeof cartItemInclude
}>

export interface MakerCartItems {
	name: string
	profileImageUrl?: string | null
	slug: string
	items: CartItem[]
}
