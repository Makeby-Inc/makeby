'use client'

import { cn } from '@core/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
		type?: 'default' | 'fill'
		isBorderDisabled?: boolean
	}
>(({ isBorderDisabled, className, type = 'default', ...props }, ref) => (
	<div className="flex items-end overflow-scroll">
		<TabsPrimitive.List
			className={cn('peer grid grid-flow-col data-[type=fill]:w-full', className)}
			ref={ref}
			{...props}
			data-type={type}
		/>
		<div
			className={cn(
				'bg-strong h-px flex-1 peer-data-[type=fill]:hidden',
				isBorderDisabled && 'hidden'
			)}
		/>
	</div>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		className={cn(
			'px-md py-xs gap-2xs data-[state=active]:border-foreground data-[state=active]:text-foreground border-muted-foreground text-muted-foreground inline-flex w-full items-center justify-center whitespace-nowrap border-b font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:pb-[7px]',
			className
		)}
		ref={ref}
		{...props}
	/>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => <TabsPrimitive.Content ref={ref} {...props} />)
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
