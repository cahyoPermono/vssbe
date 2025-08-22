import { Hono } from 'hono';
import { VSS_API_URL } from '../../config.js';
const app = new Hono();
// Query Device and GPS Status API Routes
app.post('/onoffline/queryMoreDeviceStatus.action', async (c) => {
    const { deviceID, token } = await c.req.json();
    const response = await fetch(`${VSS_API_URL}/onoffline/queryMoreDeviceStatus.action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceID, token })
    });
    const data = await response.json();
    return c.json(data);
});
app.post('/track/getApiTrackList.action', async (c) => {
    const { token, deviceID, pageNum, pageCount, beginTime, endTime } = await c.req.json();
    const response = await fetch(`${VSS_API_URL}/track/getApiTrackList.action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, deviceID, pageNum, pageCount, beginTime, endTime })
    });
    const data = await response.json();
    return c.json(data);
});
app.post('/onoffline/apiFindAll.action', async (c) => {
    const { token, pageNum, pageCount, deviceID, beginTime, endTime } = await c.req.json();
    const response = await fetch(`${VSS_API_URL}/onoffline/apiFindAll.action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, pageNum, pageCount, deviceID, beginTime, endTime })
    });
    const data = await response.json();
    return c.json(data);
});
export default app;
