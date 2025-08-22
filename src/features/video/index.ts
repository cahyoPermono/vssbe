import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const VideoFileSearchSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  channelList: z.string(),
  fileType: z.string(),
  location: z.string(),
})

const InsertWebDownRecordSchema = z.object({
  token: z.string(),
  username: z.string(),
  resStartTime: z.string(),
  resEndTime: z.string(),
  deviceNo: z.string(),
  channel: z.string(),
  fileFormat: z.string(),
})

// Routes
const videoFileSearchRoute = createRoute({
  method: 'post',
  path: '/record/videoFileSearch.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: VideoFileSearchSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful search',
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
  summary: 'Video File Search',
  description: 'Searches for video files.',
  tags: ['Video'], // Added tag
})

const insertWebDownRecordRoute = createRoute({
  method: 'post',
  path: '/webdownrecord/insert.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: InsertWebDownRecordSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Record inserted successfully',
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
  summary: 'Insert Web Down Record',
  description: 'Inserts a web download record.',
  tags: ['Video'], // Added tag
})

// Register routes
app.openapi(videoFileSearchRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/record/videoFileSearch.action`, {
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

app.openapi(insertWebDownRecordRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/vss/webdownrecord/insert.action`, {
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