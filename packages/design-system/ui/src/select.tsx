'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import type { VariantProps } from 'class-variance-authority'
import { inputVariants } from './input'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
		VariantProps<typeof inputVariants>
>(({ className, size, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		className={cn(
			'data-[placeholder]:text-muted-foreground gap-md flex w-full items-center justify-between',
			inputVariants({ size }),
			className
		)}
		ref={ref}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<Icon className="text-secondary-foreground h-4 w-4" name="ChevronDownIcon" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			className={cn(
				'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-input relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-sm',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-xs data-[side=left]:-translate-x-xs data-[side=right]:translate-x-xs data-[side=top]:-translate-y-xs',
				className
			)}
			position={position}
			ref={(instance) => {
				if (typeof ref === 'function') {
					ref(instance)
				} else if (ref) {
					ref.current = instance
				}
				if (!instance) return
				instance.ontouchstart = (e) => {
					e.preventDefault()
				}
			}}
			{...props}
		>
			<SelectPrimitive.Viewport
				className={cn(
					'p-xs',
					position === 'popper' &&
						'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
		ref={ref}
		{...props}
	/>
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		className={cn(
			'p-xs hover:bg-hover text-foreground relative flex w-full cursor-default select-none items-center justify-between rounded-sm text-sm font-medium outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className
		)}
		ref={ref}
		{...props}
	>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		{/* <SelectPrimitive.ItemIndicator>
			<Icon className="h-4 w-4" name="CheckIcon" />
		</SelectPrimitive.ItemIndicator> */}
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		className={cn('bg-muted -mx-1 my-1 h-px', className)}
		ref={ref}
		{...props}
	/>
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator
}
