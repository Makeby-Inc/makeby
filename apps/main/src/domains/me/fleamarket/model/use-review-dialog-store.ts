import { create } from 'zustand'
import { type FleamarketProductDetail } from '#/flea-market'
import { type FleamarketProductReviewDetail } from '#/me/fleamarket/model/review-detail'

interface ReviewProps {
	reviewProduct: FleamarketProductDetail | null
	productReview: FleamarketProductReviewDetail | null
}

interface ReviewState extends ReviewProps {
	setReviewProduct: (reviewProduct: FleamarketProductDetail) => void
	setProductReview: (productReview: FleamarketProductReviewDetail) => void
}

const initReviewProps: ReviewProps = {
	reviewProduct: null,
	productReview: null
}

export const useReviewDialogStore = create<ReviewState>((set) => ({
	...initReviewProps,
	setReviewProduct: (reviewProduct) => {
		set({ reviewProduct })
	},
	setProductReview: (productReview) => {
		set({ productReview })
	}
}))
