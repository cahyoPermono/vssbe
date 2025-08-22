import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

// Driver Management API Routes
app.post('/driver/apiAddDriver.action', async (c) => {
  const { token, driverName, fleetID } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/driver/apiAddDriver.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, driverName, fleetID })
  })

  const data = await response.json()
  return c.json(data)
})

export default app