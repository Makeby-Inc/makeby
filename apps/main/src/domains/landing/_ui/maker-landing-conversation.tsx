import Image from 'next/image'
import LandingConversationDesktopImage from '~/shared/assets/images/landing-conversation-desktop-image.png'
import LandingConversationMobileImage from '~/shared/assets/images/landing-conversation-mobile-image.png'

export function MakerLandingConversation() {
	return (
		<div className="flex w-full items-center justify-center">
			<Image
				src={LandingConversationDesktopImage}
				alt=""
				className="max-pc:hidden w-full"
			/>
			<Image
				src={LandingConversationMobileImage}
				alt=""
				className="pc:hidden w-full"
			/>
		</div>
	)
}
