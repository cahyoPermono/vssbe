import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

// Proxy Login API Route
app.get('/user/apiLogin.action', async (c) => {
  const username = c.req.query('username')
  const password = c.req.query('password')

  const response = await fetch(`${VSS_API_URL}/user/apiLogin.action?username=${"imaniprima"}&password=${"a95cf0e4d562a9055b2643e9d7abacc0"}`)

  const data = await response.json()
  return c.json(data)
})

// Proxy Logout API Route
app.post('/user/apiLogout.action', async (c) => {
  const { username, token } = await c.req.json()

  const response = await fetch(`${VSS_API_URL}/user/apiLogout.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, token })
  })

  const data = await response.json()
  return c.json(data)
})

export default app