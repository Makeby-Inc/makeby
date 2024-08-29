import { MobileDetailHeader } from '~/shared'

export function SignUpSection({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MobileDetailHeader pageTitle="회원가입" />
			<section className="pc:gap-[60px] pc:py-[60px] pc:w-[600px] grid gap-10 p-4">
				<h1 className="pc:flex hidden text-3xl font-semibold">회원 가입</h1>
				<div>{children}</div>
			</section>
		</>
	)
}
