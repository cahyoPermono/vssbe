import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Zod Schema for Login Query Parameters
const LoginBodySchema = z.object({
  username: z.string(),
  password: z.string(),
})

// Define the Login OpenAPI Route
const loginRoute = createRoute({
  method: 'post',
  path: '/user/apiLogin.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful login',
      content: {
        'application/json': {
          schema: z.object({}), // Assuming a generic successful response for now
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
  summary: 'User Login',
  description: 'Authenticates a user and returns a token.',
  tags: ['Auth'], // Added tag
})

// Register the Login route with OpenAPIHono
app.openapi(loginRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/user/apiLogin.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'imaniprima', password: 'a95cf0e4d562a9055b2643e9d7abacc0' }),
  })
  // const response = await fetch(`${VSS_API_URL}/user/apiLogin.action?username=${'imaniprima'}&password=${'a95cf0e4d562a9055b2643e9d7abacc0'}`)
  const data = await response.json()
  return c.json(data)
})

// Zod Schema for Logout Request Body
const LogoutBodySchema = z.object({
  username: z.string(),
  token: z.string(),
})

// Define the Logout OpenAPI Route
const logoutRoute = createRoute({
  method: 'post',
  path: '/user/apiLogout.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LogoutBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful logout',
      content: {
        'application/json': {
          schema: z.object({}), // Assuming a generic successful response for now
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
  summary: 'User Logout',
  description: 'Logs out a user.',
  tags: ['Auth'], // Added tag
})

// Register the Logout route with OpenAPIHono
app.openapi(logoutRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/user/apiLogout.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})



export default app