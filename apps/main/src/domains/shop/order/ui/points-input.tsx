'use client'
import { Button, Input } from '@design-system/ui'
import { useCreateOrderStore } from '#/shop/order/model'
import { DELIVERY_COST } from '~/shared'

interface PointsInputProps {
	totalPoints: number
	totalPrice: number
}

export function PointsInput({
	totalPrice,
	totalPoints
}: PointsInputProps): JSX.Element {
	const { usedPoints, setUsedPoints } = useCreateOrderStore()
	const availableMaxAmount = totalPrice + DELIVERY_COST - 100
	const isMax = usedPoints === totalPoints

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		let value = parseInt(event.target.value)
		if (isNaN(value) || value < 0) {
			setUsedPoints(0)
			return
		}
		value = Math.min(value, totalPoints)
		value = Math.min(value, availableMaxAmount)

		setUsedPoints(value)
	}

	function handleUseAllPoints() {
		const point = Math.min(totalPoints, availableMaxAmount)
		setUsedPoints(point)
	}

	return (
		<div className="grid gap-2">
			<h5 className="font-semibold">포인트</h5>
			<div className="flex gap-2">
				<Input
					value={usedPoints}
					type="number"
					placeholder="사용할 포인트를 입력해주세요"
					onChange={handleInputChange}
					className="flex-1"
					disabled={totalPoints < 1000}
				/>
				<Button variant="outline" disabled={isMax} onClick={handleUseAllPoints}>
					전액 사용
				</Button>
			</div>
			<p className="text-secondary-foreground text-sm">
				보유 포인트 : {totalPoints.toLocaleString()}
			</p>
			{((usedPoints > 0 && usedPoints < 1000) || totalPoints < 1000) && (
				<p className="text-negative text-sm">
					1,000포인트 이상부터 사용 가능합니다.
				</p>
			)}
		</div>
	)
}
