import { proxy } from "../../proxy.js";
import { Context } from "hono";
import { App } from "../../../../../utils/App.js";

proxy.post("/vss/voice/addVoiceFile.action", async (c: Context) => {
    try {
        const app = new App(c);
        const result = await app.post("/vss/voice/addVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 500)
    }
});

proxy.post("/vss/voice/deleteVoiceFile.action", async (c: Context) => {
    try {
        const app = new App(c);
        const result = await app.post("/vss/voice/deleteVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 500)
    }
});

proxy.post("/vss/voice/updateVoiceFile.action", async (c: Context) => {
    try {
        const app = new App(c);
        const result = await app.post("/vss/voice/updateVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 500)
    }
});

proxy.post("/vss/voice/getVoiceFile.action", async (c: Context) => {
    try {
        const app = new App(c);
        const result = await app.post("/vss/voice/getVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 500)
    }
});

proxy.post("/vss/voice/issueVoiceFile.action", async (c: Context) => {
    try {
        const app = new App(c);
        const result = await app.post("/vss/voice/issueVoiceFile.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 500)
    }
});

proxy.post("/vss/voice/openVoice.action", async (c: Context) => {
    try {
        const app = new App(c);
        const result = await app.post("/vss/voice/openVoice.action", await c.req.json());
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 500)
    }
});