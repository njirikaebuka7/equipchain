import path from "node:path";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// ─── CORS ────────────────────────────────────────────────────────────────────
// Allow both local dev and the production Vercel domain
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── SESSION STORE ───────────────────────────────────────────────────────────
// Uses connect-pg-simple backed by Supabase PostgreSQL so sessions persist
// across serverless invocations on Vercel.
const PgStore = connectPgSimple(session);

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV === "production") {
  throw new Error("SESSION_SECRET environment variable is required in production");
}
const resolvedSessionSecret = sessionSecret || "equipchain-dev-secret-not-for-production";

const sessionStore = new PgStore({
  conString: process.env.DATABASE_URL,
  tableName: "session",
  createTableIfMissing: true, // auto-creates table if not present
  ttl: 7 * 24 * 60 * 60, // 7 days in seconds
  pruneSessionInterval: 60 * 15, // prune expired sessions every 15 min
});

app.use(
  session({
    store: sessionStore,
    secret: resolvedSessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use("/api", router);

// Serve frontend React SPA in production mode (when not on Vercel)
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  const publicPath = path.resolve(__dirname, "../../web/dist/public");
  app.use(express.static(publicPath));

  app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

export default app;
