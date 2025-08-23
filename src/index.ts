import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

// Import Feature Modules
import alarm from './features/alarm/index.js'
import auth from './features/auth/index.js'
import device from './features/device/index.js'
import driver from './features/driver/index.js'
import geofence from './features/geofence/index.js'
import onoffline from './features/onoffline/index.js'
import passenger from './features/passenger/index.js'
import status from './features/status/index.js'
import track from './features/track/index.js'
import traffic from './features/traffic/index.js'
import vehicle from './features/vehicle/index.js'
import video from './features/video/index.js'
import voice from './features/voice/index.js'
import record from './features/record/index.js'
import area from './features/area/index.js'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: 'Validation Failed',
        cause: result.error,
      })
    }
  },
}) // Changed from Hono to OpenAPIHono

// Custom Error Handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    if (err.cause instanceof ZodError) {
      const issues = err.cause.issues.map((issue) => {
        const path = issue.path.join('.')
        const message = issue.message.toLowerCase()
        return `Invalid input for ${path}: ${message}`
      })
      const message = issues.join('; ')
      return c.json(
        {
          success: false,
          error: {
            name: 'ZodError',
            message,
          },
        },
        err.status,
      )
    }
    return err.getResponse()
  }

  // Fallback for other errors
  return c.json(
    {
      success: false,
      error: {
        name: 'Error',
        message: 'Internal Server Error',
      },
    },
    500,
  )
})

// Middlewares
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', secureHeaders())
app.use('*', cors())

// Root Route
app.get('/', (c) => {
  return c.json({ message: 'VSS BE Proxy Running!' })
})

// Feature Routes
app.route('/api', alarm)
app.route('/api', auth)
app.route('/api', device)
app.route('/api', driver)
app.route('/api', geofence)
app.route('/api', onoffline)
app.route('/api', passenger)
app.route('/api', record)
app.route('/api', status)
app.route('/api', track)
app.route('/api', traffic)
app.route('/api', vehicle)
app.route('/api', video)
app.route('/api', voice)
app.route('/api', area)

// Expose OpenAPI JSON at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'VSSBE - VSS Backend Proxy Server',
    description: 'API documentation for the VSS Backend Proxy Server.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server',
    },
  ],
  tags: [
    { name: 'Alarm', description: 'Operations related to alarms' },
    { name: 'Auth', description: 'User authentication operations' },
    { name: 'Device', description: 'Device management operations' },
    { name: 'Driver', description: 'Driver management operations' },
    { name: 'Geofence', description: 'Geofence management operations' },
    { name: 'On/Offline', description: 'On/Offline status operations' },
    { name: 'Passenger', description: 'Passenger record operations' },
    { name: 'Status', description: 'Device and GPS status operations' },
    { name: 'Track', description: 'Track management operations' },
    { name: 'Traffic', description: 'Traffic consumption operations' },
    { name: 'Vehicle', description: 'Vehicle management operations' },
    { name: 'Video', description: 'Video and file management operations' },
    { name: 'Voice', description: 'Voice communication operations' },
    { name: 'Record', description: 'Device Record operations' },
    { name: 'Geofence Area', description: 'Geofence group and area management operations' },
    { name: 'Geofence Area Device', description: 'Geofence and device mapping operations' },
  ],
})

// Serve Swagger UI at /swagger-ui, pointing to the OpenAPI JSON document
app.get(
  '/swagger-ui',
  swaggerUI({
    url: '/doc', // This must match the path where your OpenAPI JSON is exposed
  }),
)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(`Swagger UI available at http://localhost:${info.port}/swagger-ui`)
  },
)