import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const PassengerRecordDetailSchema = z.object({
  token: z.string(),
  recordId: z.string(),
})

const PassengerRecordStatisticsSchema = z.object({
  token: z.string(),
  beginTime: z.string(),
  endTime: z.string(),
})

// Routes
const passengerRecordDetailRoute = createRoute({
  method: 'post',
  path: '/passengerrecord/detail.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PassengerRecordDetailSchema,
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
  summary: 'Passenger Record Detail',
  description: 'Retrieves detailed passenger records.',
  tags: ['Passenger'], // Added tag
})

const passengerRecordStatisticsRoute = createRoute({
  method: 'post',
  path: '/passengerrecord/statistics.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PassengerRecordStatisticsSchema,
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
  summary: 'Passenger Record Statistics',
  description: 'Retrieves statistics for passenger records.',
  tags: ['Passenger'], // Added tag
})

// Register routes
app.openapi(passengerRecordDetailRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/passengerrecord/detail.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

app.openapi(passengerRecordStatisticsRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/passengerrecord/statistics.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

export default app