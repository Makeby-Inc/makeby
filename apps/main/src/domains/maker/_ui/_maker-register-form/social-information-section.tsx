import { Button, type ControllerRenderProps, toast } from '@design-system/ui'
import { forwardRef } from 'react'
import { SnsInformationCard } from '#/maker/_ui/_maker-register-form/sns-information-card'
import { type SocialData } from '~/shared'

interface SocialInformationSectionProps {
	socialIds: SocialData[]
}

export const SocialInformationSection = forwardRef<
	HTMLDivElement,
	ControllerRenderProps<SocialInformationSectionProps, 'socialIds'>
>(({ value, onChange }, ref) => {
	const addSocialInformation = () => {
		const id = self.crypto.randomUUID()
		if (value.length >= 3) {
			toast({
				description: 'SNS 정보는 최대 3개까지 등록 가능합니다'
			})
			return
		}
		onChange([...value, { id, socialType: 'X', socialId: '' }])
	}

	const removeSocialInformation = (id: string) => {
		onChange(value.filter((social) => social.id !== id))
	}

	return (
		<div className="grid gap-3" ref={ref}>
			{value.map((social, index) => (
				<SnsInformationCard
					key={social.id}
					data={social}
					isPrimary={index === 0}
					onDelete={(id) => {
						removeSocialInformation(id)
					}}
					onChange={(v) => {
						onChange(value.map((data) => (data.id === v.id ? v : data)))
					}}
				/>
			))}
			<Button
				type="button"
				size="sm"
				variant="outline"
				className="w-fit"
				onClick={addSocialInformation}
			>
				추가하기
			</Button>
		</div>
	)
})
SocialInformationSection.displayName = 'SocialInformationSection'
