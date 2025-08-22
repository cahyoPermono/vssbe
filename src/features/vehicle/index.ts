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

// Register routes
app.openapi(getVehicleSettingRoute, async (c) => {
  try {
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
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(apiVehicleSettingRoute, async (c) => {
  try {
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
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

export default app