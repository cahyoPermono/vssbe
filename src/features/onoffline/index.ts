import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

app.post("/vss/onoffline/apiFindAll.action", async (c) => {
    try {
        const result = await app.post(`${VSS_API_URL}/vss/onoffline/apiFindAll.action`, await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

export default app