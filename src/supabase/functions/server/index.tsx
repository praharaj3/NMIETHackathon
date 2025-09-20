/// <reference path="../types/deno.d.ts" />
// @ts-ignore - Deno npm: imports are resolved at runtime
import { Hono } from "npm:hono";
// @ts-ignore - Deno npm: imports are resolved at runtime
import { cors } from "npm:hono/cors";
// @ts-ignore - Deno npm: imports are resolved at runtime
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-5264457e/health", (c: any) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);