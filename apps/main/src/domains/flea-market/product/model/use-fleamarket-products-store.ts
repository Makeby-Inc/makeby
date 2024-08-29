import { create } from 'zustand'
import { type FleamarketProductListItem } from '#/flea-market/product/model/fleamarket-product-list-item'
import { type FleamarketProductFilterDto } from '#/flea-market/product/model/fleamarket-product-filter-dto'

interface FleamarketProductsProps extends FleamarketProductFilterDto {
	products: FleamarketProductListItem[]
	loading: boolean
}

interface FleamarketProductsState extends FleamarketProductsProps {
	setProducts: (products: FleamarketProductListItem[]) => void
	setLoading: (loading: boolean) => void

	setCategorySlug: (categorySlug: string) => void
	setExcludeSoldout: (excludeSoldout: boolean) => void
	setSortBy: (sortBy: string) => void
	setPage: (page: number) => void
	setTradeTypeBy: (tradeTypeBy: string) => void
}

const initFleamarketProductsProps: FleamarketProductsProps = {
	products: [],
	loading: true,

	categorySlug: '',
	excludeSoldout: false,
	sortBy: '최신순',
	page: 1,
	tradeTypeBy: 'SELL'
}

export const useFleamarketProductsStore = create<FleamarketProductsState>(
	(set) => ({
		...initFleamarketProductsProps,
		setProducts: (products) => {
			set({ products })
		},
		setLoading: (loading) => {
			set({ loading })
		},
		setCategorySlug: (categorySlug) => {
			set({ categorySlug })
		},
		setExcludeSoldout: (excludeSoldout) => {
			set({ excludeSoldout })
		},
		setSortBy: (sortBy) => {
			set({ sortBy })
		},
		setPage: (page) => {
			set({ page })
		},
		setTradeTypeBy: (tradeTypeBy) => {
			set({ tradeTypeBy })
		}
	})
)
