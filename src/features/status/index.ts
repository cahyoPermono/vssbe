import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const GetApiTrackListSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  beginTime: z.string(),
  endTime: z.string(),
})

const OnOfflineApiFindAllSchema = z.object({
  token: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  deviceID: z.string(),
  beginTime: z.string(),
  endTime: z.string(),
})

// Routes
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
  summary: 'Get API Track List',
  description: 'Retrieves the track list for a device within a time range.',
  tags: ['Status'], // Added tag
})

const onOfflineApiFindAllRoute = createRoute({
  method: 'post',
  path: '/onoffline/apiFindAll.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: OnOfflineApiFindAllSchema,
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
  summary: 'Find All On/Offline Records',
  description: 'Finds all device data within a time range.',
  tags: ['Status'], // Added tag
})

// Register routes
app.openapi(getApiTrackListRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/track/getApiTrackList.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(onOfflineApiFindAllRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/onoffline/apiFindAll.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

export default app