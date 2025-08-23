import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const VideoFileSearchSchema = z.object({
  token: z.string(),
  deviceID: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  channelList: z.string(),
  fileType: z.string(),
  location: z.string(),
})

const InsertWebDownRecordSchema = z.object({
  token: z.string(),
  username: z.string(),
  resStartTime: z.string(),
  resEndTime: z.string(),
  deviceNo: z.string(),
  channel: z.string(),
  fileFormat: z.string(),
})

const FindTaskProgressSchema = z.object({
  token: z.string(),
  taskId: z.string(),
  resWebPath: z.string(),
})

const TaskManagementSchema = z.object({
  token: z.string(),
  username: z.string(),
  taskId: z.string(),
  action: z.number(),
  resWebPath: z.string(),
})

const FindPageSchema = z.object({
  token: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  taskStartTime: z.string(),
  taskEndTime: z.string(),
  deviceNo: z.string(),
  username: z.string(),
  
})

// Routes
const videoFileSearchRoute = createRoute({
  method: 'post',
  path: '/record/videoFileSearch.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: VideoFileSearchSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful search',
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
  summary: 'Video File Search',
  description: 'Searches for video files.',
  tags: ['Video'], // Added tag
})

const insertWebDownRecordRoute = createRoute({
  method: 'post',
  path: '/webdownrecord/insert.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: InsertWebDownRecordSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Record inserted successfully',
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
  summary: 'Insert Web Down Record',
  description: 'Inserts a web download record.',
  tags: ['Video'], // Added tag
})

const findTaskProgressRoute= createRoute({
  method: 'post',
  path: '/webdownrecord/findTaskProgress.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindTaskProgressSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successfull Search',
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
  summary: 'Insert Web Down Record',
  description: 'Inserts a web download record.',
  tags: ['Video'], // Added tag
})

const taskManagementRoute= createRoute({
  method: 'post',
  path: '/webdownrecord/taskManagement.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: TaskManagementSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successfull Search',
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
  summary: 'Task Management',
  description: 'Task Management.',
  tags: ['Video'], // Added tag
})

const findPageSchemaRoute= createRoute({
  method: 'post',
  path: '/webdownrecord/findPage.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindPageSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successfull Search',
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
  summary: 'Find Page',
  description: 'Find Page',
  tags: ['Video'], // Added tag
})

// Register routes
app.openapi(videoFileSearchRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/record/videoFileSearch.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(insertWebDownRecordRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/vss/webdownrecord/insert.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(findTaskProgressRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/vss/webdownrecord/findTaskProgress.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(taskManagementRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/vss/webdownrecord/taskManagement.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(findPageSchemaRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/vss/webdownrecord/findPage.action`, {
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