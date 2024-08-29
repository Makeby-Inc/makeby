import { z } from 'zod'

export enum TradeProductsType {
	SELL = 'SELL',
	BUY = 'BUY'
}

export enum TradeStatusType {
	SALE = 'SALE',
	SOLDOUT = 'SOLDOUT'
}

export const myFleamarketFilterDto = z.object({
	tradeTypeBy: z.nativeEnum(TradeProductsType),
	tradeStatusBy: z.nativeEnum(TradeStatusType),
	page: z.number().optional()
})

export type MyFleamarketFilterDto = z.infer<typeof myFleamarketFilterDto>
