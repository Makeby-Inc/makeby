import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@core/utils'

const badgeVariants = cva(
	'inline-flex items-center rounded-full text-center font-medium transition-colors',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground',
				secondary: 'bg-secondary text-secondary-foreground',
				outline:
					'text-secondary-foreground bg-background ring-muted-foreground ring-1 ring-inset',
				destructive: 'bg-destructive text-destructive-foreground'
			},
			size: {
				default: 'py-2xs px-md text-sm',
				sm: 'py-2xs px-sm text-xs',
				lg: 'py-2xs px-md text-base'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant, size }), className)} {...props} />
	)
}

export { Badge, badgeVariants }
