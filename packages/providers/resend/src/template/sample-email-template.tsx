import { EmailContentDto } from '../type'

export function EmailTemplate({ firstName }: EmailContentDto) {
	return (
		<div>
			<h1>Welcome, {firstName}!</h1>
		</div>
	)
}
