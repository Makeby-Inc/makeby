import { SolapiMessageService } from 'solapi'
import {
	KAKAO_ALIMTALK_PFID,
	SENDER_PHONE_NUMBER,
	SOLAPI_API_KEY,
	SOLAPI_API_SECRET_KEY
} from './config'
import { SendKakaoAlimtalkRequest, SendShortSMSRequest } from './type'
import { validatePhoneNumber } from './validators'

const messageService = new SolapiMessageService(
	SOLAPI_API_KEY,
	SOLAPI_API_SECRET_KEY
)

class SolapiService {
	/**
	 *
	 * @param to 수신번호 예) 01012345678
	 * @satisfies 발신번호, 수신번호에 반드시 -, * 등 특수문자를 제거하여 기입
	 * @param text 메시지 내용
	 * @satisfies SMS는 한글 45자, 영자 90자까지 입력 가능
	 * @see https://developers.solapi.dev/sdk-list/Node.js/send-message#%EB%8B%A8%EB%AC%B8-%EB%AC%B8%EC%9E%90sms-%EB%B0%9C%EC%86%A1
	 */
	async sendShortSMS({ to, text }: SendShortSMSRequest) {
		try {
			const hyphenRemovedPhoneNumber = to.replace(/-/g, '')
			validatePhoneNumber(hyphenRemovedPhoneNumber)
			await messageService.send({
				to: hyphenRemovedPhoneNumber,
				from: SENDER_PHONE_NUMBER,
				text
			})
		} catch (error) {
			console.error('Failed to send short SMS:', error)
			throw error
		}
	}

	/**
	 *
	 * @param to 수신번호 예) 01012345678
	 * @param templateId 템플릿 ID
	 * @param variables 템플릿 변수 예) { "#{name}": "세종대왕" }
	 * @param scheduledDate 예) 2024-06-161T00:00:00.000Z
	 * @see https://developers.solapi.com/references/messages/sendManyDetail#%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EC%95%8C%EB%A6%BC%ED%86%A1ata
	 */
	async sendKakaoAlimtalk({
		to,
		templateId,
		variables,
		scheduledDate
	}: SendKakaoAlimtalkRequest) {
		if (!to) return

		try {
			const hyphenRemovedPhoneNumber = to.replace(/-/g, '')
			validatePhoneNumber(hyphenRemovedPhoneNumber)

			const result = await messageService.send(
				{
					to: hyphenRemovedPhoneNumber,
					kakaoOptions: {
						pfId: KAKAO_ALIMTALK_PFID,
						templateId,
						variables
					}
				},
				{ scheduledDate }
			)

			console.log('Kakao Alimtalk sent:', result)
		} catch (error) {
			console.error('Failed to send Kakao Alimtalk:', error)
			console.error(error)
		}
	}

	async sendVerificationSms(phoneNumber = '', token = '') {
		const message = `[메잇바이] 인증번호: [${token}]`
		await this.sendShortSMS({
			to: phoneNumber,
			text: message
		})
	}
}

export const solapiService = new SolapiService()
