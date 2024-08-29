'use client'

import Lottie from 'lottie-react'
import { cn } from '@core/utils'
import LottieLoadingJson from '~/shared/assets/icon/loading.json'

export function LoadingSpinner({ className }: { className?: string }) {
	return (
		<Lottie
			animationData={LottieLoadingJson}
			className={cn('h-[120px] w-[120px]', className)}
		/>
	)
}
