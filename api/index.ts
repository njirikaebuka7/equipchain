/**
 * Vercel Serverless Function Entry Point
 *
 * This file wraps the Express app from apps/api so Vercel can
 * run it as a serverless function. All /api/* requests are
 * routed here via vercel.json rewrites.
 */
import "../apps/api/src/loadEnv.js";
import app from "../apps/api/src/app.js";

export default app;
