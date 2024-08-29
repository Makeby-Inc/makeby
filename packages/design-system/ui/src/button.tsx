import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
	'disabled:bg-muted disabled:text-muted-foreground gap-xs inline-flex items-center justify-center rounded-md transition-all disabled:pointer-events-none disabled:border-none',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:shadow-md',
				secondary: 'bg-secondary text-foreground hover:shadow-md',
				outline:
					'border-strong text-secondary-foreground bg-background border hover:bg-black/5',
				ghost: 'text-foreground',
				link: 'text-foreground hover:underline',
				destructive: 'bg-destructive text-destructive-foreground',
				loading:
					'bg-secondary-foreground text-primary-foreground pointer-events-none'
			},
			size: {
				sm: 'px-md py-xs text-sm font-medium',
				default: 'px-lg py-sm text-base font-bold',
				lg: 'px-lg py-md text-base font-semibold'
			},
			options: {
				icon: '!p-0'
			}
		},
		compoundVariants: [
			{
				options: 'icon',
				size: 'sm',
				class: 'h-9 w-9'
			},
			{
				options: 'icon',
				size: 'default',
				class: 'h-12 w-12'
			},
			{
				options: 'icon',
				size: 'lg',
				class: 'h-[60px] w-[60px]'
			}
		],
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, options, asChild = false, children, ...props },
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(
					'before:bg-foreground/[0.08] relative overflow-hidden before:absolute before:inset-0 before:opacity-0 before:hover:pointer-events-none before:hover:opacity-100',
					buttonVariants({ variant, size, options, className })
				)}
				ref={ref}
				{...props}
			>
				{variant === 'loading' ? (
					<div className="flex items-center gap-2">
						<Icon
							className={cn(
								'duration-2s animate-spin',
								size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
							)}
							name="ArrowPathIcon"
						/>
						{children}
					</div>
				) : (
					children
				)}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
