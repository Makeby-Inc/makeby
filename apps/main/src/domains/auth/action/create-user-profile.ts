'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { solapiService } from '@providers/solapi'
import { type CreateProfileDto, createProfileDto } from '#/auth/model'
import { SITE_DOMAIN, SITE_URL } from '~/shared'

const createUserProfileAction = authAction
	.metadata({ actionName: 'createUserProfileAction' })
	.schema(createProfileDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await createUserProfile(userId, dto)

		revalidatePath('/start/new')
	})

async function createUserProfile(userId: string, dto: CreateProfileDto) {
	const { image, name, phoneNumber, birthDate, isMarketingSubscribed } = dto
	const user = await db.user.update({
		where: { id: userId },
		data: {
			name,
			image,
			phoneNumber,
			birthDate: new Date(birthDate),
			isEmailSubscribed: isMarketingSubscribed,
			isMessageSubscribed: isMarketingSubscribed
		}
	})

	await solapiService.sendKakaoAlimtalk({
		to: user.phoneNumber,
		templateId: 'KA01TP240624030229800q8Qqnbd9ig8',
		variables: {
			'#{고객명}': user.name,
			'#{url}': `${SITE_DOMAIN}/me`
		}
	})

	await db.notification.create({
		data: {
			notificationType: '회원가입 완료',
			content:
				'회원가입을 축하드립니다! 미리 배송지 정보를 등록해두면 더욱 빠르고 편하게 구매할 수 있어요',
			link: '/me/profile',
			user: {
				connect: {
					id: user.id
				}
			}
		}
	})
}

export { createUserProfileAction }
