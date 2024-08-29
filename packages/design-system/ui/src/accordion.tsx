'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		className={cn('border-border border-b', className)}
		ref={ref}
		{...props}
	/>
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			className={cn(
				'py-md data-[state=open]:pb-xs gap-md flex flex-1 items-center justify-between text-left font-medium transition-all [&[data-state=open]>svg]:rotate-180',
				className
			)}
			ref={ref}
			{...props}
		>
			{children}
			<Icon
				className="text-foreground h-4 w-4 transition-transform duration-200"
				name="ChevronDownIcon"
			/>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		className={cn(
			'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-secondary-foreground overflow-hidden text-sm transition-all',
			className
		)}
		ref={ref}
		{...props}
	>
		<div className="pb-md">{children}</div>
	</AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
