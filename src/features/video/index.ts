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

// Real Video Route Schema (no body needed for GET)
const RealVideoSchema = z.object({})

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

const realVideoRoute = createRoute({
  method: 'get',
  path: '/realvideo.html',
  responses: {
    200: {
      description: 'Real video page content',
      content: {
        'text/html': {
          schema: z.string(),
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
  summary: 'Get Real Video Page',
  description: 'Forwards request to the real video page.',
  tags: ['Video'],
})

const proxyJsRoute = createRoute({
  method: 'get',
  path: '/common.js',
  responses: {
    200: {
      description: 'JavaScript file with URLs modified',
      content: {
        'application/javascript': {
          schema: z.string(),
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
  summary: 'Proxy JavaScript file',
  description: 'Serves JavaScript file with URLs modified.',
  tags: ['Video'],
})

const hwWebsocketRoute = createRoute({
  method: 'get',
  path: '/dist/player/hwwebsocket.js',
  responses: {
    200: {
      description: 'WebSocket player JavaScript file',
      content: {
        'application/javascript': {
          schema: z.string(),
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
  summary: 'Proxy hwwebsocket.js file',
  description: 'Forwards request to hwwebsocket.js file from the original server.',
  tags: ['Video'],
})

const playerJsRoute = createRoute({
  method: 'get',
  path: '/dist/player/player.js',
  responses: {
    200: {
      description: 'Player JavaScript file',
      content: {
        'application/javascript': {
          schema: z.string(),
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
  summary: 'Proxy player.js file',
  description: 'Forwards request to player.js file from the original server.',
  tags: ['Video'],
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

app.openapi(proxyJsRoute, async (c) => {
  try {
    const response = await fetch('https://vss.gtrack.co.id/vss/apiPage/common.js')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    let jsContent = await response.text()

    // Replace relative URLs with proxy URLs to avoid CORS issues
    const proxyBaseUrl = 'https://icognis.imaniprima.co.id'
    jsContent = jsContent
      .replace(/url:\s*'\/vss\/vehicle\/queryGtOfDevice\.action'/g, `url: '${proxyBaseUrl}/vss/vehicle/queryGtOfDevice.action'`)
      .replace(/url:\s*"\/vss\/vehicle\/queryGtOfDevice\.action"/g, `url: "${proxyBaseUrl}/vss/vehicle/queryGtOfDevice.action"`)
      .replace(/url:\s*'\/vss\/vehicle\/findUnregistered\.action'/g, `url: '${proxyBaseUrl}/vss/vehicle/findUnregistered.action'`)
      .replace(/url:\s*"\/vss\/vehicle\/findUnregistered\.action"/g, `url: "${proxyBaseUrl}/vss/vehicle/findUnregistered.action"`)

    c.header('Content-Type', 'application/javascript')
    return c.body(jsContent, 200, { 'Content-Type': 'application/javascript' })
  } catch (error) {
    return c.json({ error: 'Failed to fetch JavaScript file' }, 500)
  }
})



app.openapi(realVideoRoute, async (c) => {
  try {
    // Get query parameters from the request
    const queryParams = c.req.query()
    const queryString = new URLSearchParams(queryParams).toString()
    const targetUrl = queryString
      ? `https://vss.gtrack.co.id/vss/apiPage/RealVideo.html?${queryString}`
      : 'https://vss.gtrack.co.id/vss/apiPage/RealVideo.html'

    console.log('Fetching from:', targetUrl)

    const response = await fetch(targetUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    let htmlContent = await response.text()

    // Replace relative URLs with absolute URLs pointing to the original server
    const baseUrl = 'https://vss.gtrack.co.id'

    // Replace all href and src attributes that are relative URLs
    htmlContent = htmlContent
      .replace(/href="([^"]*)"/g, (match, path) => {
        if (path.startsWith('http') || path.startsWith('//')) return match
        if (path.startsWith('font/')) return `href="${baseUrl}/vss/apiPage/${path}"`
        if (path.startsWith('real_time.css')) return `href="${baseUrl}/vss/apiPage/${path}"`
        return `href="${baseUrl}/vss/apiPage/${path}"`
      })
      .replace(/src="([^"]*)"/g, (match, path) => {
        if (path.startsWith('http') || path.startsWith('//')) return match
        if (path.includes('/dist/player/player.js')) return `src="/api/dist/player/player.js?v=1.8.6"`
        if (path.includes('pcm-player.js')) return `src="https://vss.gtrack.co.id/vss/dist/player/pcm-player.js?v=1.8.6"`
        if (path.includes('howen_video_player.js')) return `src="https://vss.gtrack.co.id/vss/js/howen_video_player.js?v=1.8.6"`
        if (path.startsWith('../js/')) return `src="${baseUrl}/vss/js/${path.substring(6)}"`
        if (path.startsWith('../dist/')) return `src="${baseUrl}/vss/dist/${path.substring(7)}"`
        if (path.startsWith('font/')) return `src="${baseUrl}/vss/apiPage/${path}"`
        if (path.startsWith('real_time.css')) return `src="${baseUrl}/vss/apiPage/${path}"`
        if (path.includes('common.js')) return `src="https://icognis.imaniprima.co.id/api/common.js"`
        return `src="${baseUrl}/vss/apiPage/${path}"`
      })
      // Replace hardcoded AJAX URLs in JavaScript
      .replace(/url:\s*'\/([^']*)'/g, `url: '${baseUrl}/$1'`)
      .replace(/url:\s*"[^"]*"/g, `url: "${baseUrl}/$1"`)
      // Replace font URLs in JavaScript strings
      .replace(/src='font\/([^']*)'/g, `src='${baseUrl}/vss/apiPage/font/$1'`)
      .replace(/src="font\/([^"]*)"/g, `src="${baseUrl}/vss/apiPage/font/$1"`)
      // Replace WebSocket worker URL in player.js
      .replace(/\/vss\/dist\/player\/hwwebsocket\.js\?v=1\.8\.6/g, `https://vss.gtrack.co.id/vss/dist/player/hwwebsocket.js?v=1.8.6`)

    console.log('HTML content modified successfully')
    
    // Set headers to allow iframe embedding
    c.header('X-Frame-Options', 'ALLOWALL')
    c.header('Content-Security-Policy', "frame-ancestors 'self' * https:;")

    return c.html(htmlContent)
  } catch (error) {
    return c.json({ error: 'Failed to fetch real video page' }, 500)
  }
})

app.openapi(hwWebsocketRoute, async (c) => {
  try {
    // Get query parameters from the request
    const queryParams = c.req.query()
    const queryString = new URLSearchParams(queryParams).toString()
    // Changed to use the production URL instead of VSS_API_URL
    const targetUrl = queryString
      ? `https://vss.gtrack.co.id/vss/dist/player/hwwebsocket.js?${queryString}`
      : 'https://vss.gtrack.co.id/vss/dist/player/hwwebsocket.js?v=1.8.6'

    console.log('Fetching from:', targetUrl)

    const response = await fetch(targetUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    let jsContent = await response.text()

    // Replace common.js URL in hwwebsocket.js
    jsContent = jsContent.replace(
      /'common\.js'/g,
      `'https://vss.gtrack.co.id/vss/dist/player/common.js'`
    ).replace(
      /"common\.js"/g,
      `"https://vss.gtrack.co.id/vss/dist/player/common.js"`
    )
    
    // Set the correct content type for JavaScript
    c.header('Content-Type', 'application/javascript')
    
    return c.body(jsContent)
  } catch (error) {
    console.error('Error proxying hwwebsocket.js:', error)
    return c.json({ error: 'Failed to fetch hwwebsocket.js file' }, 500)
  }
})

app.openapi(playerJsRoute, async (c) => {
  try {
    // Get query parameters from the request
    const queryParams = c.req.query()
    const queryString = new URLSearchParams(queryParams).toString()
    // Use the production URL
    const targetUrl = queryString
      ? `https://vss.gtrack.co.id/vss/dist/player/player.js?${queryString}`
      : 'https://vss.gtrack.co.id/vss/dist/player/player.js?v=1.8.6'

    console.log('Fetching from:', targetUrl)

    const response = await fetch(targetUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    let jsContent = await response.text()
    
    // Replace WebSocket worker URL in player.js
    jsContent = jsContent.replace(
      /\/vss\/dist\/player\/hwwebsocket\.js\?v=1\.8\.6/g,
      `https://vss.gtrack.co.id/vss/dist/player/hwwebsocket.js?v=1.8.6`
    )

    // Replace common.js URL in player.js
    jsContent = jsContent.replace(
      /'common\.js'/g,
      `'https://vss.gtrack.co.id/vss/dist/player/common.js'`
    ).replace(
      /"common\.js"/g,
      `"https://vss.gtrack.co.id/vss/dist/player/common.js"`
    )
    
    // Set the correct content type for JavaScript
    c.header('Content-Type', 'application/javascript')
    
    return c.body(jsContent)
  } catch (error) {
    console.error('Error proxying player.js:', error)
    return c.json({ error: 'Failed to fetch player.js file' }, 500)
  }
})

export default app
