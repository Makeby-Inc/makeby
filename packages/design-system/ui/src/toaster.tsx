'use client'

import { Icon } from '@design-system/icon'
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport
} from './toast'
import { useToast } from './use-toast'

export function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, variant, action, ...props }) => {
				return (
					<Toast key={id} variant={variant} {...props}>
						<div className="flex gap-3">
							{variant === 'success' && (
								<Icon name="CheckCircleIcon" className="text-[#74BC8D]" solid />
							)}
							<div className="grid gap-1">
								{title ? <ToastTitle>{title}</ToastTitle> : null}
								{description ? (
									<ToastDescription>{description}</ToastDescription>
								) : null}
							</div>
						</div>

						{action}
						<ToastClose />
					</Toast>
				)
			})}
			<ToastViewport />
		</ToastProvider>
	)
}
