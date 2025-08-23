import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const GetVehicleSettingSchema = z.object({
  token: z.string(),
  vehicleId: z.string(),
})

const ApiVehicleSettingSchema = z.object({
  token: z.string(),
  vehicleId: z.string(),
  setting: z.record(z.string(), z.any()), // Generic object for settings
})

const ApiVehicleControllSchema = z.object({
  token: z.string(),
  deviceId: z.string(),
  action: z.number(),
  channelList: z.string(),
})

const ApiVehicleCommonControllSchema = z.object({
  token: z.string(),
  deviceId: z.string(),
  action: z.number(),
})

// Routes
const getVehicleSettingRoute = createRoute({
  method: 'post',
  path: '/vehicle/getVehicleSetting.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetVehicleSettingSchema,
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
  summary: 'Get Vehicle Setting',
  description: 'Retrieves vehicle settings.',
  tags: ['Vehicle'], // Added tag
})

const apiVehicleSettingRoute = createRoute({
  method: 'post',
  path: '/vehicle/apiVehicleSetting.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ApiVehicleSettingSchema,
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
  summary: 'API Vehicle Setting',
  description: 'Sets vehicle API settings.',
  tags: ['Vehicle'], // Added tag
})

const apiVehicleControlRoute = createRoute({
  method: 'post',
  path: '/vehicle/apiVehicleControl.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ApiVehicleControllSchema,
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
  summary: 'API Vehicle Control',
  description: 'Sets vehicle Api Control ',
  tags: ['Vehicle'], // Added tag
})
const apiVehicleCommonControlRoute = createRoute({
  method: 'post',
  path: '/vehicle/apiVehicleCommonControl.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ApiVehicleCommonControllSchema,
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
  summary: 'API Vehicle Common Control',
  description: 'Sets Vehicle Common Api Control ',
  tags: ['Vehicle'], // Added tag
})

// Register routes
app.openapi(getVehicleSettingRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/vehicle/getVehicleSetting.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

app.openapi(apiVehicleSettingRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/vehicle/apiVehicleSetting.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

app.openapi(apiVehicleControlRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/vehicle/apiVehicleControl.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

app.openapi(apiVehicleCommonControlRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/vehicle/apiVehicleCommonControl.action`, {
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