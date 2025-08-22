import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Zod Schema for Request Body
const FindAllAlarmsByTimeSchema = z.object({
  token: z.string(),
  deviceID: z.string().default("2590000333"),
  beginTime: z.string().default("2025-08-21 12:12:12"),
  endTime: z.string().default("2025-08-23 12:12:12"),
  pageNum: z.number().default(2),
  pageCount: z.number().default(20),
  alarmType: z.string().optional().default(""),
})

// Define the OpenAPI Route
const findAllAlarmsByTimeRoute = createRoute({
  method: 'post',
  path: '/alarm/apiFindAllByTime.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindAllAlarmsByTimeSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: z.object({}), // Assuming a generic successful response for now
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
  summary: 'Find All Alarms by Time',
  description: 'Retrieves all alarms within a specified time range.',
  tags: ['Alarm'], // Added tag
})

// Register the route with OpenAPIHono
app.openapi(findAllAlarmsByTimeRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/alarm/apiFindAllByTime.action`, {
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