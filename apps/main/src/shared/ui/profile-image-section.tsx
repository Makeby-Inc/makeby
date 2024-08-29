'use client'

import { Uploader } from '@design-system/template'
import { Button, type ControllerRenderProps } from '@design-system/ui'
import { ProfileAvatar } from '~/shared/ui/profile-avatar'

interface ProfileImageSectionProps {
	image: string
}

function ProfileImageSection({
	value,
	onChange
}: Pick<
	ControllerRenderProps<ProfileImageSectionProps, 'image'>,
	'value' | 'onChange'
>) {
	return (
		<div className="flex w-full items-end gap-4">
			<ProfileAvatar imageUrl={value} name="프로필" />
			<div className="flex flex-1 items-center gap-2">
				<Uploader
					bucket="images"
					accept="image/*"
					onFileChange={(v) => {
						onChange(v.url)
					}}
				>
					<Button type="button" size="sm" variant="outline">
						이미지 변경
					</Button>
				</Uploader>
				<Button
					type="button"
					size="sm"
					variant="outline"
					onClick={() => {
						onChange('')
					}}
				>
					삭제
				</Button>
			</div>
		</div>
	)
}

export { ProfileImageSection }
