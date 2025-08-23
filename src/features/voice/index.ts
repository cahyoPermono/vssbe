import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { VSS_API_URL } from '../../config.js'

const app = new OpenAPIHono()

// 3.21.1 Add voice file
const AddVoiceFileSchema = z.object({
  token: z.string(),
  lang: z.string().optional(),
  issueCallbackUrl: z.string(),
  voicePackageName: z.string(),
  voicePackageNo: z.string(),
  // voiceFile: z.instanceof(File) // Cannot be validated like this in Hono/Node server for multipart
});
const addVoiceFileRoute = createRoute({
  method: 'post',
  path: '/voice/addVoiceFile.action',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: AddVoiceFileSchema,
        },
      },
    },
  },
  responses: { 200: { description: 'Success' } },
  summary: 'Add voice file',
  tags: ['Voice'],
});
app.openapi(addVoiceFileRoute, async (c) => {
  const body = await c.req.parseBody();
  const response = await fetch(`${VSS_API_URL}/vss/voice/addVoiceFile.action`, {
    method: 'POST',
    body: body as any,
  });
  const data = await response.json();
  return c.json(data);
});

// 3.21.2 Delete voice files
const DeleteVoiceFileSchema = z.object({
  voicePackageNo: z.string(),
  token: z.string(),
});
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
  responses: { 200: { description: 'Success' } },
  summary: 'Delete voice files',
  tags: ['Voice'],
});
app.openapi(deleteVoiceFileRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/voice/deleteVoiceFile.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.21.3 Modify the voice file information
const UpdateVoiceFileSchema = z.object({
  token: z.string(),
  issueCallbackUrl: z.string().optional(),
  voicePackageName: z.string().optional(),
  voicePackageNo: z.string(),
});
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
  responses: { 200: { description: 'Success' } },
  summary: 'Modify the voice file information',
  tags: ['Voice'],
});
app.openapi(updateVoiceFileRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/voice/updateVoiceFile.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.21.4 Query voice files
const GetVoiceFileSchema = z.object({
  token: z.string(),
});
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
  responses: { 200: { description: 'Success' } },
  summary: 'Query voice files',
  tags: ['Voice'],
});
app.openapi(getVoiceFileRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/voice/getVoiceFile.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.21.5 Send voice files to a device
const IssueVoiceFileSchema = z.object({
  voicePackageNo: z.string(),
  deviceId: z.string(),
  sessionId: z.string(),
  token: z.string(),
});
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
  responses: { 200: { description: 'Success' } },
  summary: 'Send voice files to a device',
  tags: ['Voice'],
});
app.openapi(issueVoiceFileRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/voice/issueVoiceFile.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

// 3.21.7 Issue voice broadcast
const OpenVoiceSchema = z.object({
  pcmNo: z.string(),
  deviceId: z.string(),
  token: z.string(),
});
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
  responses: { 200: { description: 'Success' } },
  summary: 'Issue voice broadcast',
  tags: ['Voice'],
});
app.openapi(openVoiceRoute, async (c) => {
  const body = c.req.valid('json');
  const response = await fetch(`${VSS_API_URL}/vss/voice/openVoice.action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return c.json(data);
});

export default app;
