'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@core/utils'

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'p-3xs aria-checked:bg-primary bg-muted-foreground disabled:!bg-muted group inline-flex h-5 w-9 shrink-0 cursor-pointer items-center overflow-hidden rounded-full transition-colors disabled:cursor-not-allowed',
			className
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				'bg-primary-foreground pointer-events-none block h-4 w-4 rounded-full shadow-md transition-transform group-disabled:shadow-none data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
			)}
		/>
	</SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
