import { cn } from '@core/utils'

function skeletonShimmer(
	w: number,
	h: number,
	options?: {
		className?: string
	}
) {
	return `
  <svg width="${w}" height="${h}" class="${cn(
			'animate-pulse',
			options?.className
		)}"
  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="hsl(var(--skeleton))" offset="0%" />
        <stop stop-color="hsl(var(--skeleton-foreground))" offset="50%" />
        <stop stop-color="hsl(var(--skeleton))" offset="100%" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="hsl(var(--skeleton))" />
    <rect id="r" width="100%" height="100%" fill="url(#g)" transform="skewX(-45)" />
    <animate xlink:href="#r" attributeName="x" from="-150%" to="150%" dur="1s" repeatCount="indefinite" />
  </svg>`
}
function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			dangerouslySetInnerHTML={{
				__html: skeletonShimmer(100, 100, {
					className
				})
			}}
		/>
	)
}

export { Skeleton, skeletonShimmer }
