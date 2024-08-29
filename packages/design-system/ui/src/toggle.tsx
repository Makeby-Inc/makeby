'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@core/utils'
import type { IconProps } from '@design-system/icon'
import { Icon } from '@design-system/icon'

const toggleVariants = cva(
	'gap-xs group inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border-input hover:bg-hover bg-background data-[state=on]:bg-muted border',
				ghost:
					'text-primary-foreground bg-black/10 hover:bg-black/30 hover:!shadow-none'
			},
			size: {
				default:
					'py-xs px-sm hover:shadow-md data-[only=true]:h-12 data-[only=true]:w-12',
				sm: 'py-sm px-md text-sm hover:shadow data-[only=true]:h-9 data-[only=true]:w-9',
				lg: 'py-md px-lg text-xl hover:shadow-lg data-[only=true]:h-[60px] data-[only=true]:w-[60px]'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)
const toggleIconVariants = cva('', {
	variants: {
		size: {
			default: 'h-5 w-5',
			sm: 'h-4 w-4',
			lg: 'h-6 w-6'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})
interface ToggleProps
	extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
		VariantProps<typeof toggleVariants> {
	icon?: IconProps['name']
	children?: React.ReactNode
}
const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	ToggleProps
>(({ className, children, icon, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		className={cn(toggleVariants({ variant, size, className }))}
		data-only={!(icon && children)}
		ref={ref}
		{...props}
	>
		{icon ? (
			<>
				<Icon
					className={cn(
						toggleIconVariants({ size }),
						'group-data-[state=on]:hidden'
					)}
					name={icon}
				/>
				<Icon
					className={cn(
						toggleIconVariants({ size }),
						'group-data-[state=off]:hidden'
					)}
					name={icon}
					solid
				/>
			</>
		) : null}
		{children}
	</TogglePrimitive.Root>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
