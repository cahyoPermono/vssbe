import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const AddDeviceSchema = z.object({
  deviceID: z.string(),
  deviceName: z.string(),
  deviceType: z.string(),
  channelName: z.string(),
  token: z.string(),
  nodeGuid: z.string(),
})

const ModifyDeviceSchema = z.object({
  deviceID: z.string(),
  deviceName: z.string(),
  channelName: z.string(),
  deviceType: z.string(),
  token: z.string(),
})

const RemoveDeviceSchema = z.object({
  deviceID: z.string(),
  token: z.string(),
})

const FindAllVehiclesSchema = z.object({
  token: z.string(),
  isOnline: z.boolean().optional(),
  pageCount: z.number(),
  pageNum: z.number(),
  keyword: z.string().optional(),
})

const GetDeviceStatusSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
})

// Routes
const addDeviceRoute = createRoute({
  method: 'post',
  path: '/vehicle/apiAddDevice.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddDeviceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Device added successfully',
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
  summary: 'Add Device',
  description: 'Adds a new device.',
  tags: ['Device'], // Added tag
})

const modifyDeviceRoute = createRoute({
  method: 'post',
  path: '/vehicle/apiModifyDevice.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ModifyDeviceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Device modified successfully',
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
  summary: 'Modify Device',
  description: 'Modifies an existing device.',
  tags: ['Device'], // Added tag
})

const removeDeviceRoute = createRoute({
  method: 'post',
  path: '/vehicle/apiRemoveDevice.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RemoveDeviceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Device removed successfully',
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
  summary: 'Remove Device',
  description: 'Removes a device.',
  tags: ['Device'], // Added tag
})

const findAllVehiclesRoute = createRoute({
  method: 'post',
  path: '/vehicle/findAll.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindAllVehiclesSchema,
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
  summary: 'Find All Vehicles',
  description: 'Retrieves a list of all vehicles.',
  tags: ['Device'], // Added tag
})

const getDeviceStatusRoute = createRoute({
  method: 'post',
  path: '/vehicle/getDeviceStatus.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetDeviceStatusSchema,
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
  summary: 'Get Device Status',
  description: 'Retrieves the status of a device.',
  tags: ['Device'], // Added tag
})

// Register routes
app.openapi(addDeviceRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/vehicle/apiAddDevice.action`, {
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

app.openapi(modifyDeviceRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/vehicle/apiModifyDevice.action`, {
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

app.openapi(removeDeviceRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/vehicle/apiRemoveDevice.action`, {
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

app.openapi(findAllVehiclesRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/vehicle/findAll.action`, {
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

app.openapi(getDeviceStatusRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/vehicle/getDeviceStatus.action`, {
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