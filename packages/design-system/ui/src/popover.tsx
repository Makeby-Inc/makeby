'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@core/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			align={align}
			className={cn(
				'border-input bg-background p-lg text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 gap-lg z-50 flex w-[var(--radix-popover-trigger-width)] min-w-[200px] flex-col rounded-md border shadow-lg outline-none',
				className
			)}
			ref={ref}
			sideOffset={sideOffset}
			{...props}
		/>
	</PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			className={cn('gap-y-xs flex flex-col', className)}
			ref={ref}
			{...props}
		/>
	)
})
PopoverHeader.displayName = 'PopoverHeader'

const PopoverTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	// eslint-disable-next-line jsx-a11y/heading-has-content -- Fixed by Shadcn
	<h3 className={cn('font-bold', className)} ref={ref} {...props} />
))
PopoverTitle.displayName = 'PopoverTitle'

const PopoverDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		className={cn('text-secondary-foreground text-sm', className)}
		ref={ref}
		{...props}
	/>
))
PopoverDescription.displayName = 'PopoverDescription'

export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverDescription
}
