import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const ApiFindAllSchema = z.object({
  token: z.string().optional(),
  pageNum: z.number().optional(),
  pageCount: z.number().optional(),
  deviceID: z.string().optional(),
  beginTime: z.string().optional(),
  endTime: z.string().optional(),
})

const QueryDeviceStatusSchema = z.object({
  deviceID: z.string(),
  token: z.string(),
})

const QueryMoreDeviceStatusSchema = z.object({
  deviceID: z.string(),
  token: z.string(),
})

// Routes
const apiFindAllRoute = createRoute({
  method: 'post',
  path: '/onoffline/apiFindAll.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ApiFindAllSchema,
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
  tags: ['On/Offline'], // Added tag
})

const queryDeviceStatusRoute = createRoute({
  method: 'post',
  path: '/onoffline/queryDeviceStatus.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: QueryDeviceStatusSchema,
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
  summary: 'Query Device Status',
  description: 'Queries the status of a device.',
  tags: ['On/Offline'], // Added tag
})

const queryMoreDeviceStatusRoute = createRoute({
  method: 'post',
  path: '/onoffline/queryMoreDeviceStatus.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: QueryMoreDeviceStatusSchema,
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
  summary: 'Query More Device Status',
  description: 'Queries the status of one or more devices.',
  tags: ['On/Offline'], // Added tag
})

// Register routes
app.openapi(apiFindAllRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/onoffline/apiFindAll.action`, {
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

app.openapi(queryDeviceStatusRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/onoffline/queryDeviceStatus.action`, {
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

app.openapi(queryMoreDeviceStatusRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/onoffline/queryMoreDeviceStatus.action`, {
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