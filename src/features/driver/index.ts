import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// Schemas
const AddDriverSchema = z.object({
  token: z.string(),
  driverName: z.string(),
  fleetID: z.string(),
})

const FindDriverTripDetailSchema = z.object({
  token: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  drivers: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  lang: z.string(),
})

const FindDriverTripStatisticsSchema = z.object({
  token: z.string(),
  pageNum: z.number(),
  pageCount: z.number(),
  drivers: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  lang: z.string(),
})

// Routes
const addDriverRoute = createRoute({
  method: 'post',
  path: '/driver/apiAddDriver.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddDriverSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Driver added successfully',
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
  summary: 'Add Driver',
  description: 'Adds a new driver.',
  tags: ['Driver'], // Added tag
})

const findDriverTripDetailRoute = createRoute({
  method: 'post',
  path: '/driver/findDriverTripDetail.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindDriverTripDetailSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Trip found successfully',
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
  summary: 'Find Driver Trip',
  description: 'Find Driver Trip Detail.',
  tags: ['Driver'], // Added tag
})

const findDriverTripStatisticsRoute = createRoute({
  method: 'post',
  path: '/driver/findDriverTripStatistics.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindDriverTripStatisticsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Trip Statistic found successfully',
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
  summary: 'Find Driver Statistic Trip',
  description: 'Find Driver Statistic Trip Detail.',
  tags: ['Driver'], // Added tag
})

// Register routes
app.openapi(addDriverRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/driver/apiAddDriver.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(findDriverTripDetailRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/driver/findDriverTripDetail.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})

app.openapi(findDriverTripStatisticsRoute, async (c) => {
  const body = c.req.valid('json')
  const response = await fetch(`${VSS_API_URL}/driver/findDriverTripStatistics.action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  return c.json(data)
})


// 3.20.1 Add new driver
const InsertDriverSchema = z.object({
  cardNo: z.string(),
  driverName: z.string(),
  fleetId: z.string(),
  tel: z.string(),
  token: z.string(),
  sex: z.string(),
  birthDate: z.string().optional(),
  email: z.string().optional(),
  identityId: z.string().optional(),
  licenceNo: z.string().optional(),
  remarks: z.string().optional(),
});
const insertDriverRoute = createRoute({
  method: 'post',
  path: '/driver/insert.action',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: InsertDriverSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Add new driver',
  tags: ['Driver'],
});
app.openapi(insertDriverRoute, async (c) => {
  const body = await c.req.parseBody();
  const response = await fetch(`${VSS_API_URL}/vss/driver/insert.action`, {
    method: 'POST',
    body: body as any,
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.2 Query driver list
const FindGroupDriverSchema = z.object({
  driverName: z.string().optional(),
  token: z.string(),
  scheme: z.string().optional(),
});
const findGroupDriverRoute = createRoute({
  method: 'post',
  path: '/driver/findGroup.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindGroupDriverSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Query driver list',
  tags: ['Driver'],
});
app.openapi(findGroupDriverRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/driver/findGroup.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.3 Remove driver
const DeleteBatchDriverSchema = z.object({
  guids: z.string(),
  token: z.string(),
});
const deleteBatchDriverRoute = createRoute({
  method: 'post',
  path: '/driver/deleteBatch.action',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: DeleteBatchDriverSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Remove driver',
  tags: ['Driver'],
});
app.openapi(deleteBatchDriverRoute, async (c) => {
  const body = await c.req.parseBody();
  const response = await fetch(`${VSS_API_URL}/vss/driver/deleteBatch.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body as any),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.4 Modify driver
const UpdateDriverSchema = z.object({
  guid: z.string(),
  cardNo: z.string(),
  driverName: z.string(),
  fleetId: z.string(),
  tel: z.string(),
  token: z.string(),
  birthDate: z.string().optional(),
  email: z.string().optional(),
  identityId: z.string().optional(),
  licenceNo: z.string().optional(),
  remarks: z.string().optional(),
  sex: z.string().optional(),
});
const updateDriverRoute = createRoute({
  method: 'post',
  path: '/driver/update.action',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: UpdateDriverSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Modify driver',
  tags: ['Driver'],
});
app.openapi(updateDriverRoute, async (c) => {
  const body = await c.req.parseBody();
  const response = await fetch(`${VSS_API_URL}/vss/driver/update.action`, {
    method: 'POST',
    body: body as any,
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.5 Assign drivers to vehicles (bind)
const IssueDriverInfoSchema = z.object({
  token: z.string(),
  devices: z.array(z.string()),
  drivers: z.array(z.string()),
  scheme: z.string(),
  lang: z.string().optional(),
});
const issueDriverInfoRoute = createRoute({
  method: 'post',
  path: '/driver/issueDriverInfo.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: IssueDriverInfoSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Assign drivers to vehicles (bind)',
  tags: ['Driver'],
});
app.openapi(issueDriverInfoRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/driver/issueDriverInfo.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.6 Remove driver from vehicle (unbind)
const DeleteDriverInfoByFleetSchema = z.object({
  token: z.string(),
  deviceId: z.string(),
  driverList: z.array(z.string()),
  scheme: z.string(),
  lang: z.string().optional(),
});
const deleteDriverInfoByFleetRoute = createRoute({
  method: 'post',
  path: '/driver/deleteDriverInfoByFleet.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: DeleteDriverInfoByFleetSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Remove driver from vehicle (unbind)',
  tags: ['Driver'],
});
app.openapi(deleteDriverInfoByFleetRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/driver/deleteDriverInfoByFleet.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.7 View the driver list and delivery status of a vehicle
const FindDriverInfoByFleetSchema = z.object({
  deviceId: z.string(),
  token: z.string(),
  scheme: z.string().optional(),
});
const findDriverInfoByFleetRoute = createRoute({
  method: 'post',
  path: '/driver/findDriverInfoByFleet.action',
  request: {
    body: {
      content: {
        'application/json': {
          schema: FindDriverInfoByFleetSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'View the driver list and delivery status of a vehicle',
  tags: ['Driver'],
});
app.openapi(findDriverInfoByFleetRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/driver/findDriverInfoByFleet.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.20.8 Query Driver Details
const FindDriverSchema = z.object({
  guid: z.string(),
  token: z.string(),
});
const findDriverRoute = createRoute({
  method: 'post',
  path: '/driver/find.action',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: FindDriverSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Query Driver Details',
  tags: ['Driver'],
});
app.openapi(findDriverRoute, async (c) => {
  const body = await c.req.parseBody();
  const response = await fetch(`${VSS_API_URL}/vss/driver/find.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body as any),
  });
  const data = await response.json();
  return c.json(data);
});

export default app
