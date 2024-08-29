import { create } from 'zustand'
import { type FleaMarketProductStatus } from '@core/models'
import {
	type FleamarketReviewDetail,
	type FleamarketProductListItem
} from '#/flea-market/product'

export interface SellerProps {
	products: FleamarketProductListItem[]
	reviews: FleamarketReviewDetail[]
	productsLoading: boolean
	reviewsLoading: boolean

	category: string
	productPage: number
	reviewPage: number
	productStatusBy: FleaMarketProductStatus | ''
}

interface SellerState extends SellerProps {
	setProducts: (products: FleamarketProductListItem[]) => void
	setReviews: (reviews: FleamarketReviewDetail[]) => void
	setProductsLoading: (loading: boolean) => void
	setReviewsLoading: (loading: boolean) => void

	setCategory: (category: string) => void
	setProductPage: (page: number) => void
	setReviewPage: (page: number) => void
	setProductStatusBy: (statusBy: SellerProps['productStatusBy']) => void
}

const initSellerProductsProps: SellerProps = {
	products: [],
	reviews: [],
	productsLoading: true,
	reviewsLoading: true,

	category: '판매중인 상품',
	productPage: 1,
	reviewPage: 1,
	productStatusBy: ''
}

export const useSellerStore = create<SellerState>((set) => ({
	...initSellerProductsProps,

	setProducts: (products) => {
		set({ products })
	},
	setReviews: (reviews) => {
		set({ reviews })
	},
	setProductsLoading: (productsLoading) => {
		set({ productsLoading })
	},
	setReviewsLoading: (reviewsLoading) => {
		set({ reviewsLoading })
	},
	setCategory: (category) => {
		set({ category })
	},
	setProductPage: (productPage) => {
		set({ productPage })
	},
	setReviewPage: (reviewPage) => {
		set({ reviewPage })
	},
	setProductStatusBy: (productStatusBy) => {
		set({ productStatusBy })
	}
}))
