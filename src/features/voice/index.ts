import { Hono } from 'hono'
import { VSS_API_URL } from '../../config.js'

const app = new Hono()

app.post("/vss/voice/addVoiceFile.action", async (c) => {
    try {
        const result = await app.post("/vss/voice/addVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

app.post("/vss/voice/deleteVoiceFile.action", async (c) => {
    try {
        const result = await app.post("/vss/voice/deleteVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

app.post("/vss/voice/updateVoiceFile.action", async (c) => {
    try {
        const result = await app.post("/vss/voice/updateVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

app.post("/vss/voice/getVoiceFile.action", async (c) => {
    try {
        const result = await app.post("/vss/voice/getVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

app.post("/vss/voice/issueVoiceFile.action", async (c) => {
    try {
        const result = await app.post("/vss/voice/issueVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

app.post("/vss/voice/openVoice.action", async (c) => {
    try {
        const result = await app.post("/vss/voice/openVoice.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
});

export default app;