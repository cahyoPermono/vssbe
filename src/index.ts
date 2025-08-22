import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'

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

const app = new OpenAPIHono() // Changed from Hono to OpenAPIHono

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
app.route('/vss', alarm)
app.route('/vss', auth)
app.route('/vss', device)
app.route('/vss', driver)
app.route('/vss', geofence)
app.route('/vss', onoffline)
app.route('/vss', passenger)
app.route('/vss', status)
app.route('/vss', track)
app.route('/vss', traffic)
app.route('/vss', vehicle)
app.route('/vss', video)
app.route('/vss', voice)

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