import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const RecordEvidenceToRetrieveSchema = z.object({
  token: z.string(),
  conditionName: z.string(),
  alarmType: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  scheme: z.string().optional(),
})

// Routes
const getRecordEvidenceToRetrieveRoute = createRoute({
  method: 'post',
  path: '/record/evidenceToRetrieve.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RecordEvidenceToRetrieveSchema,
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
  summary: 'Search Alarm Evidence',
  description: 'Retrieves the alarm evidence for a device within a time range.',
  tags: ['Record'], // Added tag
})

// Register routes
app.openapi(getRecordEvidenceToRetrieveRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/record/evidenceToRetrieve.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

export default app;