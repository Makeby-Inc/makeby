'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@core/utils'

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		className={cn(
			'bg-muted relative h-4 w-full overflow-hidden rounded-full',
			className
		)}
		ref={ref}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="bg-primary h-full w-full flex-1 rounded-full transition-all"
			style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }