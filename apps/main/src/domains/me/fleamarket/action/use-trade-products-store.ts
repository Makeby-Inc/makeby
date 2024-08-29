import { create } from 'zustand'
import { type FleamarketProductDetail } from '#/flea-market'
import {
	TradeProductsType,
	TradeStatusType
} from '#/me/fleamarket/model/trade-products-filter-dto'

interface TradeProductsProps {
	products: FleamarketProductDetail[]
	loading: boolean
	tradeTypeBy: TradeProductsType
	tradeStatusBy: TradeStatusType
	page: number
}

interface TradeProductsStore extends TradeProductsProps {
	setProducts: (products: FleamarketProductDetail[]) => void
	setLoading: (loading: boolean) => void
	setTradeTypeBy: (tradeTypeBy: TradeProductsType) => void
	setTradeStatusBy: (tradeStatusBy: TradeStatusType) => void
	setPage: (page: number) => void
}

const initTradeProductsProps: TradeProductsProps = {
	products: [],
	loading: true,
	tradeTypeBy: TradeProductsType.SELL,
	tradeStatusBy: TradeStatusType.SALE,
	page: 1
}

const useTradeProductsStore = create<TradeProductsStore>((set) => ({
	...initTradeProductsProps,
	setProducts: (products) => {
		set({ products })
	},
	setLoading: (loading) => {
		set({ loading })
	},
	setTradeTypeBy: (tradeTypeBy) => {
		set({ tradeTypeBy })
	},
	setTradeStatusBy: (tradeStatusBy) => {
		set({ tradeStatusBy })
	},
	setPage: (page) => {
		set({ page })
	}
}))

export { useTradeProductsStore }
