import { editorMenuIcons } from './icons'
import { cn } from '@core/utils'
import React from 'react'

function MenuButton({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			className={cn(
				'flex h-12 w-12 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 aria-selected:bg-gray-200 aria-selected:text-gray-900',
				className
			)}
		/>
	)
}

function MenuButtonIcon({
	className,
	name,
	...props
}: React.SVGProps<SVGSVGElement> & {
	name: keyof typeof editorMenuIcons
}) {
	const icon = editorMenuIcons[name]
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={cn('h-4 w-4 fill-current', className)}
		>
			<path d={icon} />
		</svg>
	)
}

export { MenuButton, MenuButtonIcon }
