import { Logo } from '@design-system/template'
import { Separator } from '@design-system/ui'

export function StartSection({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="pc:px-[400px] grid h-fit gap-[60px] px-4 py-40">
				<div className="grid justify-center gap-2 whitespace-nowrap text-center text-4xl font-medium">
					<h1>안녕하세요.</h1>
					<div className="flex items-center gap-2">
						<Logo size="lg" /> 입니다.
					</div>
				</div>

				<div className="text-secondary-foreground flex items-center justify-center gap-2 whitespace-nowrap text-sm">
					<Separator className="shrink-0" />
					SNS 계정으로 간편 로그인
					<Separator className="shrink-0" />
				</div>

				<div className="flex justify-center">{children}</div>
			</div>
		</div>
	)
}
