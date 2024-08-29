'use server'

import { type Prisma, db } from '@core/models'
import { authAction } from '@core/react'
import {
	TradeProductsType,
	TradeStatusType,
	myFleamarketFilterDto,
	type MyFleamarketFilterDto
} from '#/me/fleamarket/model/trade-products-filter-dto'
import { fleamarketProductDetailInclude } from '#/flea-market'

const getTradeProductsAction = authAction
	.metadata({ actionName: 'getTradeProductsAction' })
	.schema(myFleamarketFilterDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const tradeProducts = await getTradeProducts(userId, dto)
		return tradeProducts
	})

export async function getTradeProducts(
	userId: string,
	dto: MyFleamarketFilterDto
) {
	const { tradeStatusBy, tradeTypeBy } = dto

	const filter: Prisma.FleaMarketProductWhereInput = {
		AND: [
			tradeTypeBy === TradeProductsType.SELL // 판매/구매
				? {
						sellerUserId: userId
				  }
				: {
						buyerUserId: userId
				  },
			tradeStatusBy === TradeStatusType.SALE // 판매중/거래완료
				? {
						NOT: {
							status: 'SOLD_OUT'
						}
				  }
				: {
						status: 'SOLD_OUT'
				  }
		]
	}

	const products = await db.fleaMarketProduct.findMany({
		where: filter,
		include: fleamarketProductDetailInclude
	})
	return products
}

export { getTradeProductsAction }
