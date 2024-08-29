'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@core/utils'

interface LabelProps
	extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
		VariantProps<typeof labelVariants> {
	title: string
	guideText?: string
	size?: 'sm' | 'default'
}
const labelVariants = cva(
	'flex flex-col gap-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	{
		variants: {
			direction: {
				left: 'flex-row',
				right: 'flex-row',
				top: 'flex-col',
				default: 'flex-col'
			}
		},
		defaultVariants: {
			direction: 'default'
		}
	}
)

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	LabelProps
>(
	(
		{
			className,
			title,
			direction,
			guideText,
			size = 'default',
			children,
			...props
		},
		ref
	) => (
		<LabelPrimitive.Root
			className={cn(labelVariants({ direction }), className)}
			ref={ref}
			{...props}
		>
			{(direction === 'left' || direction === 'top') && children}
			<div className="space-y-3xs max-w-[200px] text-sm">
				<div
					className={cn(
						'text-foreground font-semibold',
						size === 'default' && 'text-base'
					)}
				>
					{title}
				</div>
				<div className="text-secondary-foreground font-light">{guideText}</div>
			</div>
			{(!direction || direction === 'right' || direction === 'default') &&
				children}
		</LabelPrimitive.Root>
	)
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
