import { create } from 'zustand'

// 전역 다이얼로그 오픈 상태 관리
interface DialogProps {
	isWelcomeDialogOpened: boolean // 회원가입 후 환영 다이얼로그
	isDeliveryInfoListModalOpened: boolean // 배송지 목록 모달
	isUpdateDeliveryInfoModalOpened: boolean // 배송지 수정 모달
	isReviewCreateDialogOpened: boolean // 리뷰 작성 모달
	isMyReviewDetailDialogOpened: boolean // 내가 작성한 후기 상세 모달
	isReceivedReviewDialogOpened: boolean // 받은 후기 상세 모달
}

interface DialogStore extends DialogProps {
	toggleDialog: (dialogName: keyof DialogProps) => void
}

const initialDialogState: DialogProps = {
	isWelcomeDialogOpened: false,
	isDeliveryInfoListModalOpened: false,
	isUpdateDeliveryInfoModalOpened: false,
	isReviewCreateDialogOpened: false,
	isMyReviewDetailDialogOpened: false,
	isReceivedReviewDialogOpened: false
}

const useDialogStore = create<DialogStore>((set) => ({
	...initialDialogState,
	toggleDialog(dialogName) {
		set((state) => ({
			...state,
			[dialogName]: !state[dialogName]
		}))
	}
}))

export { useDialogStore }
