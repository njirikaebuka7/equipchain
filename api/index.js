/**
 * Vercel Serverless Function Entry Point
 *
 * This file wraps the pre-compiled Express app from apps/api/dist/app.mjs
 * so Vercel can run it as a serverless function.
 */
import "../apps/api/src/loadEnv.js";

let app;
try {
  // Use dynamic import to catch and log any startup/initialization errors
  const appModule = await import("../apps/api/dist/app.mjs");
  app = appModule.default;
} catch (err) {
  console.error("CRITICAL ERROR during serverless function startup:", err);
  throw err;
}

export default app;
