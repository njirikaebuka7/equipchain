import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Username and password required" });
      return;
    }

    const [user] = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.username, username))
      .limit(1);

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    (req.session as any).adminId = user.id;
    (req.session as any).username = user.username;

    res.json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/auth/me", requireAuth, async (req, res) => {
  const adminId = (req.session as any).adminId;
  const [user] = await db
    .select({ id: adminUsersTable.id, username: adminUsersTable.username })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, adminId))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json(user);
});

export default router;
