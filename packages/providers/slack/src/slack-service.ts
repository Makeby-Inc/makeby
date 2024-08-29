import { WebClient } from '@slack/web-api'

class SlackService {
	private token = process.env.SLACK_API_TOKEN
	private slack = new WebClient(this.token)

	constructor() {}

	async postMessage(channel: string, message: string) {
		console.log('slackService.postMessage', channel, message)

		try {
			await this.slack.chat.postMessage({
				channel,
				text: message
			})
		} catch (error) {
			console.error('slackService.postMessage', error)
		}
	}
}

export const slackService = new SlackService()
