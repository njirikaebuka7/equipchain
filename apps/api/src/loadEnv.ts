import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Hydrate environment variables from the monorepo workspace root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
