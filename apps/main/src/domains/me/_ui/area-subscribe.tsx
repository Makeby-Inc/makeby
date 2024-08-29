'use client'

import { Switch } from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { type UserInformationDto } from '#/me/_model'
import {
	switchEmailSubscriptionAction,
	switchMessageSubscriptionAction
} from '#/me/_action'

export function SubscribeArea({ myData }: { myData: UserInformationDto }) {
	const [messageSubscribed, setMessageSubscribed] = useState(
		myData.isMessageSubscribed
	)
	const [emailSubscribed, setEmailSubscribed] = useState(
		myData.isEmailSubscribed
	)

	const switchMessageAction = useAction(switchMessageSubscriptionAction)

	function handleMessageCheck(checked: boolean) {
		setMessageSubscribed(checked)
		switchMessageAction.execute()
	}

	const switchEmailAction = useAction(switchEmailSubscriptionAction)

	function handleEmailCheck(checked: boolean) {
		setEmailSubscribed(checked)
		switchEmailAction.execute()
	}

	return (
		<div className="flex flex-col gap-10 border-t-2 pt-4">
			<div className="pc:gap-10 pc:text-xl flex flex-col gap-6 pt-4 text-lg font-semibold">
				마케팅 정보 수신 동의
			</div>
			<div className="flex gap-10">
				<div className="flex gap-3">
					<Switch
						checked={messageSubscribed}
						onCheckedChange={(checked) => {
							handleMessageCheck(checked)
						}}
					/>
					<div>문자메시지</div>
				</div>
				<div className="flex gap-3">
					<Switch
						checked={emailSubscribed}
						onCheckedChange={(checked) => {
							handleEmailCheck(checked)
						}}
					/>
					<div>이메일</div>
				</div>
			</div>
		</div>
	)
}
