import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// 3.18.1 Add Geofence group
const AddGroupSchema = z.object({
  token: z.string(),
  groupName: z.string(),
  lang: z.string().optional(),
})
const addGroupRoute = createRoute({
  method: 'post',
  path: '/area/addGroup.action',
  request: { body: { content: { 'application/json': { schema: AddGroupSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Add Geofence group',
  tags: ['Geofence Area'],
})
app.openapi(addGroupRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/addGroup.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.2 Delete Geofence group
const DeleteGroupSchema = z.object({
  token: z.string(),
  groupGuid: z.string(),
  lang: z.string().optional(),
})
const deleteGroupRoute = createRoute({
  method: 'post',
  path: '/area/deleteGroup.action',
  request: { body: { content: { 'application/json': { schema: DeleteGroupSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Delete Geofence group',
  tags: ['Geofence Area'],
})
app.openapi(deleteGroupRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/deleteGroup.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.3 Modify Geofence Group
const UpdateGroupSchema = z.object({
  token: z.string(),
  groupGuid: z.string(),
  groupName: z.string(),
  lang: z.string().optional(),
})
const updateGroupRoute = createRoute({
  method: 'post',
  path: '/area/updateGroup.action',
  request: { body: { content: { 'application/json': { schema: UpdateGroupSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Modify Geofence Group',
  tags: ['Geofence Area'],
})
app.openapi(updateGroupRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/updateGroup.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.4 Get details of Group
const FindGroupSchema = z.object({
  token: z.string(),
  groupName: z.string().optional(),
  lang: z.string().optional(),
})
const findGroupRoute = createRoute({
  method: 'post',
  path: '/area/findGroup.action',
  request: { body: { content: { 'application/json': { schema: FindGroupSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Get details of Group',
  tags: ['Geofence Area'],
})
app.openapi(findGroupRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/findGroup.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.5 Add Geofence
const GpsDataSchema = z.object({
    longi: z.number(),
    lati: z.number(),
});
const AreaInfoSchema = z.object({
    radius: z.number().optional(),
    gpsData: z.array(GpsDataSchema),
});
const InsertAreaSchema = z.object({
  token: z.string(),
  areaName: z.string(),
  areaType: z.number(),
  description: z.string().optional(),
  areaInfo: z.string(), // JSON string
  groupGuid: z.string().optional(),
  lang: z.string().optional(),
})
const insertAreaRoute = createRoute({
  method: 'post',
  path: '/area/insert.action',
  request: { body: { content: { 'application/json': { schema: InsertAreaSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Add Geofence',
  tags: ['Geofence Area'],
})
app.openapi(insertAreaRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/insert.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.6 Get all Geofence (including Group)
const FindAllAreaSchema = z.object({
  token: z.string(),
  keyword: z.string().optional(),
  lang: z.string().optional(),
})
const findAllAreaRoute = createRoute({
  method: 'post',
  path: '/area/findAll.action',
  request: { body: { content: { 'application/json': { schema: FindAllAreaSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Get all Geofence (including Group)',
  tags: ['Geofence Area'],
})
app.openapi(findAllAreaRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/findAll.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.7 Modify Geofence
const UpdateAreaSchema = z.object({
  token: z.string(),
  guid: z.string(),
  areaName: z.string(),
  areaType: z.number(),
  description: z.string().optional(),
  areaInfo: z.string(), // JSON string
  groupGuid: z.string().optional(),
  lang: z.string().optional(),
})
const updateAreaRoute = createRoute({
  method: 'post',
  path: '/area/update.action',
  request: { body: { content: { 'application/json': { schema: UpdateAreaSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Modify Geofence',
  tags: ['Geofence Area'],
})
app.openapi(updateAreaRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/update.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.8 Delete Geofence
const DeleteAreaSchema = z.object({
  token: z.string(),
  guid: z.string(),
  lang: z.string().optional(),
})
const deleteAreaRoute = createRoute({
  method: 'post',
  path: '/area/delete.action',
  request: { body: { content: { 'application/json': { schema: DeleteAreaSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Delete Geofence',
  tags: ['Geofence Area'],
})
app.openapi(deleteAreaRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/delete.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.9 Get details of Geofence
const FindAreaSchema = z.object({
  token: z.string(),
  guid: z.string(),
  lang: z.string().optional(),
})
const findAreaRoute = createRoute({
  method: 'post',
  path: '/area/find.action',
  request: { body: { content: { 'application/json': { schema: FindAreaSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Get details of Geofence',
  tags: ['Geofence Area'],
})
app.openapi(findAreaRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/find.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.10 Import Geofence from kml
const ImportAreaSchema = z.object({
  token: z.string(),
  lang: z.string().optional(),
  // file: z.instanceof(File) // Cannot be validated like this in Hono/Node server for multipart
});
const importAreaRoute = createRoute({
  method: 'post',
  path: '/area/import.action',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: ImportAreaSchema
        }
      }
    }
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Import Geofence from kml',
  tags: ['Geofence Area'],
})
app.openapi(importAreaRoute, async (c) => {
  const body = await c.req.parseBody()
  const result = await fetch(`${VSS_API_URL}/vss/area/import.action`, {
    method: 'POST',
    body: body as any,
  });
  const data = await result.json();
  return c.json(data);
});


// 3.18.11 Batch export to Geofence kml file
const ExportAreaSchema = z.object({
  token: z.string(),
  guidList: z.string(),
  lang: z.string().optional(),
})
const exportAreaRoute = createRoute({
  method: 'post',
  path: '/area/export.action',
  request: { body: { content: { 'application/json': { schema: ExportAreaSchema } } } },
  responses: { 200: { description: 'Success, returns KML file' } },
  summary: 'Batch export to Geofence kml file',
  tags: ['Geofence Area'],
})
app.openapi(exportAreaRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/area/export.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  // Return KML file directly
  c.header('Content-Type', 'application/vnd.google-earth.kml+xml')
  return new Response(result.body, { headers: { 'Content-Type': 'application/vnd.google-earth.kml+xml' } })
})

// 3.18.12 Issue Geofence to devices
const ToggleConditionSchema = z.object({
    over: z.object({
        enable: z.number(),
        spd: z.string(),
        dut: z.string(),
        linkRecord: z.number(),
        linkLockChn: z.number(),
        linkUploadChn: z.number(),
        linkOutput: z.number(),
        linkSnapChn: z.number(),
        linkNet: z.number(),
        linkCamSwitch: z.number(),
        linkTTSSwitch: z.number(),
        linkBuzzer: z.number(),
    }),
    st1: z.string(),
    et1: z.string(),
    st2: z.string(),
    et2: z.string(),
});
const InsertAreaDeviceSchema = z.object({
  token: z.string(),
  areaId: z.string(),
  deviceId: z.string(),
  toggleConditionJson: z.string(), // JSON string
  lang: z.string().optional(),
})
const insertAreaDeviceRoute = createRoute({
  method: 'post',
  path: '/areaDevice/insert.action',
  request: { body: { content: { 'application/json': { schema: InsertAreaDeviceSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Issue Geofence to devices',
  tags: ['Geofence Area Device'],
})
app.openapi(insertAreaDeviceRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/areaDevice/insert.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.13 Get issue record of a geofence
const GetAreaListByAreaIdSchema = z.object({
  token: z.string(),
  areaId: z.string(),
  lang: z.string().optional(),
})
const getAreaListByAreaIdRoute = createRoute({
  method: 'post',
  path: '/areaDevice/getAreaListByAreaId.action',
  request: { body: { content: { 'application/json': { schema: GetAreaListByAreaIdSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Get issue record of a geofence',
  tags: ['Geofence Area Device'],
})
app.openapi(getAreaListByAreaIdRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/areaDevice/getAreaListByAreaId.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.14 Delete a Geofence in device
const DeleteAreaDeviceSchema = z.object({
  token: z.string(),
  guid: z.string(),
  lang: z.string().optional(),
})
const deleteAreaDeviceRoute = createRoute({
  method: 'post',
  path: '/areaDevice/delete.action',
  request: { body: { content: { 'application/json': { schema: DeleteAreaDeviceSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Delete a Geofence in device',
  tags: ['Geofence Area Device'],
})
app.openapi(deleteAreaDeviceRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/areaDevice/delete.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})

// 3.18.15 Get the issue details of a Geofence
const GetLastToggleConditionJsonSchema = z.object({
  token: z.string(),
  areaId: z.string(),
  deviceId: z.string(),
  lang: z.string().optional(),
})
const getLastToggleConditionJsonRoute = createRoute({
  method: 'post',
  path: '/areaDevice/getlastToggleConditionJson.action',
  request: { body: { content: { 'application/json': { schema: GetLastToggleConditionJsonSchema } } } },
  responses: { 200: { description: 'Success' } },
  summary: 'Get the issue details of a Geofence',
  tags: ['Geofence Area Device'],
})
app.openapi(getLastToggleConditionJsonRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await fetch(`${VSS_API_URL}/vss/areaDevice/getlastToggleConditionJson.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await result.json()
  return c.json(data)
})


export default app
