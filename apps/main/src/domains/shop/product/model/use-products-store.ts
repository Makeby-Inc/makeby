import { create } from 'zustand'
import {
	type ProductFilterDto,
	type ProductListItem
} from '#/shop/product/model'

interface ProductsProps extends ProductFilterDto {
	products: ProductListItem[]
	loading: boolean
}

interface ProductsState extends ProductsProps {
	setProducts: (products: ProductListItem[]) => void
	setLoading: (loading: boolean) => void

	setCategorySlug: (categorySlug: string) => void
	setExcludeSoldout: (excludeSoldout: boolean) => void
	setSortBy: (sortBy: string) => void
	setPage: (page: number) => void
}

const initProductsProps: ProductsProps = {
	products: [],
	loading: true,
	categorySlug: '',
	excludeSoldout: false,
	sortBy: '최신순',
	page: 1
}

export const useProductsStore = create<ProductsState>((set) => ({
	...initProductsProps,
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
	}
}))
