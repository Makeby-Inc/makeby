'use client'

import { useState } from 'react'
import { useAction } from '@core/react'
import { ProfileImageSection } from '~/shared'
import { type UserInformationDto } from '#/me/_model'
import { imageUpdateAction } from '#/me/_action'

export function ProfileImageArea({ myData }: { myData: UserInformationDto }) {
	const [profileImage, setProfileImage] = useState(myData.image)

	const profileImageUpdateAction = useAction(imageUpdateAction)

	function handelImageUrl(imageUrl: string) {
		setProfileImage(imageUrl)
		profileImageUpdateAction.execute({ image: imageUrl })
	}

	return (
		<div className="flex gap-4">
			<ProfileImageSection
				value={profileImage}
				onChange={(imageUrl) => {
					handelImageUrl(imageUrl as string)
				}}
			/>
		</div>
	)
}
