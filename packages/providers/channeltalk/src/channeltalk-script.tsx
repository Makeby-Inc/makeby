'use client'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'
import { useEffect } from 'react'

const ChanneltalkScript = (): JSX.Element => {
	useEffect(() => {
		ChannelService.loadScript()
		ChannelService.boot({
			pluginKey: process.env.NEXT_PUBLIC_CHANNELTALK_ID || ''
		})
	}, [])

	return <></>
}

export { ChanneltalkScript }
