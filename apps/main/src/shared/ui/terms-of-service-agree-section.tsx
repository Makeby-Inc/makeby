import { cn } from '@core/utils'
import { Checkbox } from '@design-system/ui'
import Link from 'next/link'
import {
	MARKETING_USAGE_URL,
	PRIVACY_POLICY_URL,
	TERMS_OF_SERVICE_URL
} from '~/shared/lib/constants'

export type TermsType = 'AGE' | 'TERMS' | 'PRIVACY' | 'MARKETING'

interface TermsOfServiceAgreeSectionProps {
	agreedTerms: TermsType[]
	onAgreeChange: (agreedTerms: TermsType[]) => void
}

export function TermsOfServiceAgreeSection({
	agreedTerms,
	onAgreeChange
}: TermsOfServiceAgreeSectionProps) {
	const termsOfService: {
		label: string
		value: TermsType
		link?: string
	}[] = [
		{
			label: '만 14세 이상',
			value: 'AGE'
		},
		{
			label: '이용 약관',
			value: 'TERMS',
			link: TERMS_OF_SERVICE_URL
		},
		{
			label: '개인정보 수집 및 이용 동의',
			value: 'PRIVACY',
			link: PRIVACY_POLICY_URL
		},
		{
			label: '마케팅 수신 동의(선택)',
			value: 'MARKETING',
			link: MARKETING_USAGE_URL
		}
	]

	return (
		<div className="grid gap-2">
			<div className="text-sm font-semibold">이용약관</div>
			<div className="overflow-hidden rounded-lg border">
				<div className="bg-secondary px-4 py-3">
					<CheckboxLabel
						label="전체 동의"
						isChecked={agreedTerms.length === termsOfService.length}
						onChange={(checked) => {
							if (checked) {
								onAgreeChange(termsOfService.map((t) => t.value))
								return
							}
							onAgreeChange([])
						}}
					/>
				</div>
				<div className="grid gap-3 p-4">
					{termsOfService.map((term) => (
						<CheckboxLabel
							key={term.label}
							label={term.label}
							link={term.link}
							isChecked={agreedTerms.includes(term.value)}
							onChange={(checked) => {
								if (checked) {
									onAgreeChange([...agreedTerms, term.value])
									return
								}
								onAgreeChange(agreedTerms.filter((t) => t !== term.value))
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function CheckboxLabel({
	label,
	link,
	isChecked,
	onChange
}: {
	label: string
	link?: string
	isChecked: boolean
	onChange: (checked: boolean) => void
}) {
	return (
		<div className="flex items-center gap-[5px]">
			<Checkbox
				checked={isChecked}
				onCheckedChange={(v) => {
					onChange(v as boolean)
				}}
			/>
			<div className={cn('text-sm font-medium', link && 'hover:text-primary')}>
				{link ? (
					<Link href={link} target="_blank">
						{label}
					</Link>
				) : (
					label
				)}
			</div>
		</div>
	)
}
