import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

// Traffic Consumption API Route
app.post('/traffic/consumeRecord.action', async (c) => {
  const { token, deviceID, startTime, endTime } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/traffic/consumeRecord.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, deviceID, startTime, endTime })
  })

  const data = await response.json()
  return c.json(data)
})

export default app