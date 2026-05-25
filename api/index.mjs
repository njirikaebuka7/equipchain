/**
 * Vercel Serverless Function Entry Point (ESM)
 *
 * This file wraps the pre-compiled Express app from apps/api/dist/app.mjs
 * so Vercel can run it as a serverless function. We use the .mjs extension
 * to force Node.js to load this file as a native ES Module.
 */
import app from "../apps/api/dist/app.mjs";

export default app;
