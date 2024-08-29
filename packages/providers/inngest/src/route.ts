/**
 * /app/api/inngest/route.ts
 */
import { inngest } from './client'
import { sampleFunction } from './functions'
import { serve } from 'inngest/next'

// This function can run for a maximum of 300 seconds
export const maxDuration = 300

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [sampleFunction]
})
