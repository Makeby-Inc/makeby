export interface SendShortSMSRequest {
	to: string
	text: string
}

export interface SendKakaoAlimtalkRequest {
	to?: string | null
	templateId: string
	variables: Record<`#{${string}}`, string>
	scheduledDate?: Date
}
