import { cn } from '@core/utils'
import './typography.css'

interface ViewerProps extends React.HTMLAttributes<HTMLDivElement> {
	data: string
}

function Viewer({ data, className, ...props }: ViewerProps) {
	return (
		<div
			{...props}
			className={cn('typo tiptap bg-gray-100', className)}
			dangerouslySetInnerHTML={{ __html: data }}
		/>
	)
}

export default Viewer
