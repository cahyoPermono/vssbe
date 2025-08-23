import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const AddDriverSchema = z.object({
  token: z.string(),
  driverName: z.string(),
  fleetID: z.string(),
})

const FindDriverTripDetailSchema = z.object({
  token: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  drivers: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  lang: z.string(),
})

const FindDriverTripStatisticsSchema = z.object({
  token: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  drivers: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  lang: z.string(),
})

// Routes
const addDriverRoute = createRoute({
  method: 'post',
  path: '/driver/apiAddDriver.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddDriverSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Driver added successfully',
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
  summary: 'Add Driver',
  description: 'Adds a new driver.',
  tags: ['Driver'], // Added tag
})

const findDriverTripDetailRoute = createRoute({
  method: 'post',
  path: '/driver/findDriverTripDetail.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindDriverTripDetailSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Trip found successfully',
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
  summary: 'Find Driver Trip',
  description: 'Find Driver Trip Detail.',
  tags: ['Driver'], // Added tag
})

const findDriverTripStatisticsRoute = createRoute({
  method: 'post',
  path: '/driver/findDriverTripStatistics.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindDriverTripStatisticsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Trip Statistic found successfully',
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
  summary: 'Find Driver Statistic Trip',
  description: 'Find Driver Statistic Trip Detail.',
  tags: ['Driver'], // Added tag
})

// Register routes
app.openapi(addDriverRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/driver/apiAddDriver.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(findDriverTripDetailRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/driver/findDriverTripDetail.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(findDriverTripStatisticsRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/driver/findDriverTripStatistics.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

export default app