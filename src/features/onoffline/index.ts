import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

app.post("/vss/onoffline/apiFindAll.action", async (c) => {
    try {
        const result = await app.post(`${VSS_API_URL}/vss/onoffline/apiFindAll.action`, await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

app.post('/onoffline/queryDeviceStatus.action', async (c) => {
  const { deviceID, token } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/onoffline/queryDeviceStatus.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deviceID, token })
  })

  const data = await response.json()
  return c.json(data)
})

app.post('/onoffline/queryMoreDeviceStatus.action', async (c) => {
  const { deviceID, token } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/onoffline/queryMoreDeviceStatus.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deviceID, token })
  })

  const data = await response.json()
  return c.json(data)
})

export default app