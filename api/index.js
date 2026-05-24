/**
 * Vercel Serverless Function Entry Point
 *
 * This file wraps the pre-compiled Express app from apps/api/dist/app.mjs
 * so Vercel can run it as a serverless function.
 */
import "../apps/api/src/loadEnv.js";
import app from "../apps/api/dist/app.mjs";

export default app;
