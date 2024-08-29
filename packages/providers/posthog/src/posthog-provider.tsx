'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false // Disable automatic pageview capture, as we capture manually
	})
}

interface PostHogPageviewProps {
	pathname: string
	searchParams: URLSearchParams
}

/**
 * 
 * @param pathname 
 * @param searchParams
 * @returns 
 * @example
 * import { usePathname, useSearchParams } from "next/navigation";
 * import { PostHogPageview, PHProvider } from "@yourorg/providers/posthog";
 * function MyApp() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <PHProvider>
      <PostHogPageview pathname={pathname} searchParams={searchParams} />
      <body>  
        <main>{children}</main>
      </body>
      </PHProvider>
    );
  }
 *
 */
function PostHogPageview({ pathname, searchParams }: PostHogPageviewProps) {
	useEffect(() => {
		if (pathname) {
			let url = window.origin + pathname
			if (searchParams.toString()) {
				url += `?${searchParams.toString()}`
			}
			posthog.capture('$pageview', {
				$current_url: url
			})
		}
	}, [pathname, searchParams])

	return <></>
}

/**
 * 
 * @description Layout에 PHProvider로 감싸서 추가해주세요.
 * @example
      <PHProvider>
        <body>
          <main>{children}</main>
        </body>
      </PHProvider>
**/
function PHProvider({ children }: { children: React.ReactNode }) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export { PostHogPageview, PHProvider }
