import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const GetTrackListSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
  beginTime: z.string(),
  endTime: z.string(),
})

const GetApiTrackListSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  beginTime: z.string(),
  endTime: z.string(),
})

// Routes
const getTrackListRoute = createRoute({
  method: 'post',
  path: '/track/getTrackList.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetTrackListSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful query',
      content: {
        'application/json': {
          schema: z.object({}),
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
  summary: 'Get VSS Track List',
  description: 'Retrieves the VSS track list.',
  tags: ['Track'], // Added tag
})

const getApiTrackListRoute = createRoute({
  method: 'post',
  path: '/track/getApiTrackList.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetApiTrackListSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful query',
      content: {
        'application/json': {
          schema: z.object({}),
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
  summary: 'Get VSS API Track List',
  description: 'Retrieves the VSS API track list.',
  tags: ['Track'], // Added tag
})

// Register routes
app.openapi(getTrackListRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/track/getTrackList.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(getApiTrackListRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/track/getApiTrackList.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

export default app