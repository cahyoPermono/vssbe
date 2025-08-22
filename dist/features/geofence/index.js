import { Hono } from 'hono';
import { VSS_API_URL } from '../../config.js';
const app = new Hono();
// Geofence API Routes
app.post('/geofence/apiAddGeofence.action', async (c) => {
    const { token, name, coordinates, type, radius } = await c.req.json();
    const response = await fetch(`${VSS_API_URL}/geofence/apiAddGeofence.action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, name, coordinates, type, radius })
    });
    const data = await response.json();
    return c.json(data);
});
export default app;
