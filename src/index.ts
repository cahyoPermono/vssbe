import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import auth from './features/auth/index.js'
import device from './features/device/index.js'
import driver from './features/driver/index.js'
import geofence from './features/geofence/index.js'
import status from './features/status/index.js'
import traffic from './features/traffic/index.js'
import video from './features/video/index.js'
import alarm from './features/alarm/index.js'
import onoffline from './features/onoffline/index.js'
import passenger from './features/passenger/index.js'
import track from './features/track/index.js'
import vehicle from './features/vehicle/index.js'
import voice from './features/voice/index.js'

const app = new Hono()

app.route('/vss', auth)
app.route('/vss', device)
app.route('/vss', driver)
app.route('/vss', geofence)
app.route('/vss', status)
app.route('/vss', traffic)
app.route('/vss', video)
app.route('/vss', alarm)
app.route('/vss', onoffline)
app.route('/vss', passenger)
app.route('/vss', track)
app.route('/vss', vehicle)
app.route('/vss', voice)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)