import { Hono } from 'hono';
import { VSS_API_URL } from '../../config.js';
const app = new Hono();
// Video & File Management API Routes
app.post('/record/videoFileSearch.action', async (c) => {
    const { token, deviceID, startTime, endTime, channelList, fileType, location } = await c.req.json();
    const response = await fetch(`${VSS_API_URL}/record/videoFileSearch.action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, deviceID, startTime, endTime, channelList, fileType, location })
    });
    const data = await response.json();
    return c.json(data);
});
app.post('/vss/webdownrecord/insert.action', async (c) => {
    const { token, username, resStartTime, resEndTime, deviceNo, channel, fileFormat } = await c.req.json();
    const response = await fetch(`${VSS_API_URL}/vss/webdownrecord/insert.action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, username, resStartTime, resEndTime, deviceNo, channel, fileFormat })
    });
    const data = await response.json();
    return c.json(data);
});
export default app;
