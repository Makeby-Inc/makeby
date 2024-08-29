/**
 * 샘플 카운터 스토어입니다.
 */

import { create } from 'zustand'

interface CounterProps {
	count: number
}

interface CounterStore extends CounterProps {
	increment: () => void
	decrement: () => void
	reset: () => void
}

const initialCounterState: CounterProps = {
	count: 0
}

const useCreateCounterStore = create<CounterStore>((set) => ({
	...initialCounterState,
	increment: () => {
		set((state) => ({
			...state,
			count: state.count + 1
		}))
	},

	decrement: () => {
		set((state) => ({
			...state,
			count: state.count - 1
		}))
	},
	reset: () => {
		set(initialCounterState)
	}
}))

export { useCreateCounterStore }
