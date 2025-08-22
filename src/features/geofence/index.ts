import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const AddGeofenceSchema = z.object({
  token: z.string(),
  name: z.string(),
  coordinates: z.string(),
  type: z.string(),
  radius: z.number(),
})

// Routes
const addGeofenceRoute = createRoute({
  method: 'post',
  path: '/geofence/apiAddGeofence.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddGeofenceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Geofence added successfully',
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
  summary: 'Add Geofence',
  description: 'Adds a new geofence.',
  tags: ['Geofence'], // Added tag
})

// Register routes
app.openapi(addGeofenceRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const response = await fetch(`${VSS_API_URL}/geofence/apiAddGeofence.action`, {
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