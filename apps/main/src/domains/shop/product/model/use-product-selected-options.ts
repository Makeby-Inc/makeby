'use client'

import { create } from 'zustand'
import { type ProductDetail } from '#/shop/product/model/product-detail'

export type ProductSelectableOption = ProductDetail['options'][0]

export interface ProductSelectedOption {
	option: ProductSelectableOption
	count: number
}

interface ProductSelectedOptionsProps {
	selectedOptions: ProductSelectedOption[]
}

interface ProductSelectedOptionsState extends ProductSelectedOptionsProps {
	add: (option: ProductSelectableOption) => void
	remove: (id: string) => void
	changeCount: (id: string, count: number) => void
	reset: () => void
}

const initialProductSelectedOptions: ProductSelectedOptionsProps = {
	selectedOptions: []
}

export const useProductSelectedOptions = create<ProductSelectedOptionsState>(
	(set, get) => ({
		...initialProductSelectedOptions,
		add: (option) => {
			const selectedOptions = get().selectedOptions

			const isOptionExist = selectedOptions.some(
				(selectedOption) => selectedOption.option.id === option.id
			)

			if (isOptionExist) {
				return
			}

			set((state) => ({
				selectedOptions: [
					{
						option,
						count: 1
					},
					...state.selectedOptions
				]
			}))
		},
		remove: (id) => {
			set((state) => ({
				selectedOptions: state.selectedOptions.filter(
					(option) => option.option.id !== id
				)
			}))
		},
		changeCount: (id, count) => {
			set((state) => ({
				selectedOptions: state.selectedOptions.map((option) => {
					if (option.option.id === id) {
						return {
							...option,
							count
						}
					}
					return option
				})
			}))
		},
		reset: () => {
			set(() => initialProductSelectedOptions)
		}
	})
)
