import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const ConsumeRecordSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
  startTime: z.string(),
  endTime: z.string(),
})

// Routes
const consumeRecordRoute = createRoute({
  method: 'post',
  path: '/traffic/consumeRecord.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ConsumeRecordSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Record consumed successfully',
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
  summary: 'Consume Traffic Record',
  description: 'Records traffic consumption.',
  tags: ['Traffic'], // Added tag
})

// Register routes
app.openapi(consumeRecordRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/traffic/consumeRecord.action`, {
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