'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		className={cn(
			'border-input aria-checked:bg-primary bg-strong aria-checked:text-primary-foreground aria-checked:border-primary disabled:bg-muted peer h-4 w-4 shrink-0 rounded-sm border disabled:cursor-not-allowed',
			className
		)}
		ref={ref}
		{...props}
	>
		<div className="text-background flex h-full w-full items-center justify-center">
			<Icon className="h-3 w-3" name="CheckIcon" />
		</div>
		<CheckboxPrimitive.Indicator
			className={cn('flex h-full w-full items-center justify-center')}
		>
			<Icon className="h-3 w-3" name="CheckIcon" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
