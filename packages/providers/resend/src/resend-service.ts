import { Resend } from 'resend'

import { ResendRequest } from './type'
import { EmailTemplate } from './template'

const SENDER_EMAIL = 'onboarding@resend.dev'
const resend = new Resend(process.env.RESEND_API_KEY)

class ResendService {
	async sendEmail(req: ResendRequest) {
		const { data, error } = await resend.emails.send({
			from: SENDER_EMAIL,
			to: req.userName,
			subject: 'Hello World',
			react: EmailTemplate(req)
		})
		if (error) {
			throw new Error(error.message)
		}
		return data
	}
}

export const resendService = new ResendService()
