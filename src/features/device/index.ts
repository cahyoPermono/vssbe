import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

// Device Management API Routes
app.post('/vehicle/apiAddDevice.action', async (c) => {
  const { deviceID, deviceName, deviceType, channelName, token, nodeGuid } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/vehicle/apiAddDevice.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deviceID, deviceName, deviceType, channelName, token, nodeGuid })
  })

  const data = await response.json()
  return c.json(data)
})

app.post('/vehicle/apiModifyDevice.action', async (c) => {
  const { deviceID, deviceName, channelName, deviceType, token } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/vehicle/apiModifyDevice.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deviceID, deviceName, channelName, deviceType, token })
  })

  const data = await response.json()
  return c.json(data)
})

app.post('/vehicle/apiRemoveDevice.action', async (c) => {
  const { deviceID, token } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/vehicle/apiRemoveDevice.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deviceID, token })
  })

  const data = await response.json()
  return c.json(data)
})

app.post("/vehicle/findAll.action", async (c) => {
  const { token, isOnline, pageCount, pageNum, keyword } = await c.req.json();
  const response = await fetch(
    `${VSS_API_URL}/vehicle/findAll.action`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, isOnline, pageCount, pageNum, keyword }),
    }
  );
  const data = await response.json();
  return c.json(data);
})

export default app