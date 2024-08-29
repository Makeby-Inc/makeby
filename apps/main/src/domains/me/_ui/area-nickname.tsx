'use client'

import { Input, Button, useToast } from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { type UserInformationDto } from '#/me/_model'
import { nicknameUpdateAction } from '#/me/_action'

export function NicknameArea({ myData }: { myData: UserInformationDto }) {
	const [nickname, setNickname] = useState(myData.name)
	const { toast } = useToast()
	const updateNicknameAction = useAction(nicknameUpdateAction, {
		onSuccess: () => {
			toast({
				title: '변경 성공 !',
				description: '닉네임이 변경되었습니다.',
				variant: 'success'
			})
		}
	})

	function handleUpdateClick() {
		setNickname(nickname)
		updateNicknameAction.execute({ name: nickname })
	}
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value)
	}

	return (
		<div className="flex flex-col gap-[5px]">
			<div className="text-sm font-semibold">닉네임</div>
			<div className="flex gap-2">
				<Input value={nickname} onChange={handleInputChange} />
				<Button
					className="border-strong text-secondary-foreground whitespace-nowrap"
					variant="outline"
					onClick={handleUpdateClick}
				>
					저장
				</Button>
			</div>
		</div>
	)
}
