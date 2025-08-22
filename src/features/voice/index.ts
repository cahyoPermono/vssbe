import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const AddVoiceFileSchema = z.object({
  token: z.string(),
  fileName: z.string(),
  fileContent: z.string(), // Assuming base64 encoded content
})

const DeleteVoiceFileSchema = z.object({
  token: z.string(),
  fileId: z.string(),
})

const UpdateVoiceFileSchema = z.object({
  token: z.string(),
  fileId: z.string(),
  newFileName: z.string().optional(),
  newFileContent: z.string().optional(), // Assuming base64 encoded content
})

const GetVoiceFileSchema = z.object({
  token: z.string(),
  fileId: z.string(),
})

const IssueVoiceFileSchema = z.object({
  token: z.string(),
  fileId: z.string(),
  deviceId: z.string(),
})

const OpenVoiceSchema = z.object({
  token: z.string(),
  deviceId: z.string(),
})

// Routes
const addVoiceFileRoute = createRoute({
  method: 'post',
  path: '/voice/addVoiceFile.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddVoiceFileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
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
  summary: 'Add Voice File',
  description: 'Adds a new voice file.',
  tags: ['Voice'], // Added tag
})

const deleteVoiceFileRoute = createRoute({
  method: 'post',
  path: '/voice/deleteVoiceFile.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: DeleteVoiceFileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
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
  summary: 'Delete Voice File',
  description: 'Deletes a voice file.',
  tags: ['Voice'], // Added tag
})

const updateVoiceFileRoute = createRoute({
  method: 'post',
  path: '/voice/updateVoiceFile.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateVoiceFileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
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
  summary: 'Update Voice File',
  description: 'Updates an existing voice file.',
  tags: ['Voice'], // Added tag
})

const getVoiceFileRoute = createRoute({
  method: 'post',
  path: '/voice/getVoiceFile.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetVoiceFileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
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
  summary: 'Get Voice File',
  description: 'Retrieves a voice file.',
  tags: ['Voice'], // Added tag
})

const issueVoiceFileRoute = createRoute({
  method: 'post',
  path: '/voice/issueVoiceFile.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: IssueVoiceFileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
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
  summary: 'Issue Voice File',
  description: 'Issues a voice file.',
  tags: ['Voice'], // Added tag
})

const openVoiceRoute = createRoute({
  method: 'post',
  path: '/voice/openVoice.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: OpenVoiceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
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
  summary: 'Open Voice',
  description: 'Opens voice communication.',
  tags: ['Voice'], // Added tag
})

// Register routes
app.openapi(addVoiceFileRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/voice/addVoiceFile.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(deleteVoiceFileRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/voice/deleteVoiceFile.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(updateVoiceFileRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/voice/updateVoiceFile.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(getVoiceFileRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/voice/getVoiceFile.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(issueVoiceFileRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/voice/issueVoiceFile.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

app.openapi(openVoiceRoute, async (c) => {
  try {
    const body = c.req.valid('json')
    const result = await fetch(`${VSS_API_URL}/vss/voice/openVoice.action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await result.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
})

export default app