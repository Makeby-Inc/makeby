'use client'

import { Icon } from '@design-system/icon'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@design-system/ui'

interface TooltipIconProps {
	text: string
	className?: string
}

export function TooltipIcon({
	text,
	className
}: TooltipIconProps): JSX.Element {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Icon
						className="text-secondary-foreground h-4 w-4"
						name="QuestionMarkCircleIcon"
						solid
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p className="whitespace-pre-line">{text}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
