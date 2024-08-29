import { MobileBottomStickySection } from '@design-system/template'
import { type ProductSelectableOption } from '#/shop/product/model'
import {
	LikeButton,
	type LikeButtonProps
} from '#/shop/product/ui/_detail-action/like-button'
import { MobileOptionDrawer } from '#/shop/product/ui/_detail-action/mobile-option-drawer'

interface MobileBottomSectionProps extends LikeButtonProps {
	options: ProductSelectableOption[]
}

export function MobileBottomSection({
	options,
	...likeButtonProps
}: MobileBottomSectionProps): JSX.Element {
	return (
		<MobileBottomStickySection>
			<div className="flex gap-2">
				<LikeButton {...likeButtonProps} />
				<MobileOptionDrawer options={options} />
			</div>
		</MobileBottomStickySection>
	)
}
