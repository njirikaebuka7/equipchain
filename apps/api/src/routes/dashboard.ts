import { Router } from "express";
import { db } from "@workspace/db";
import { blogPostsTable, contactSubmissionsTable, quoteRequestsTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/dashboard/stats", requireAuth, async (_req, res) => {
  try {
    const [
      totalPosts,
      publishedPosts,
      totalContacts,
      unreadContacts,
      totalQuotes,
      newQuotes,
      recentContacts,
      recentQuotes,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(blogPostsTable),
      db.select({ count: sql<number>`count(*)` }).from(blogPostsTable).where(eq(blogPostsTable.status, "published")),
      db.select({ count: sql<number>`count(*)` }).from(contactSubmissionsTable),
      db.select({ count: sql<number>`count(*)` }).from(contactSubmissionsTable).where(eq(contactSubmissionsTable.isRead, false)),
      db.select({ count: sql<number>`count(*)` }).from(quoteRequestsTable),
      db.select({ count: sql<number>`count(*)` }).from(quoteRequestsTable).where(eq(quoteRequestsTable.status, "new")),
      db.select().from(contactSubmissionsTable).orderBy(desc(contactSubmissionsTable.createdAt)).limit(5),
      db.select().from(quoteRequestsTable).orderBy(desc(quoteRequestsTable.createdAt)).limit(5),
    ]);

    res.json({
      totalPosts: Number(totalPosts[0].count),
      publishedPosts: Number(publishedPosts[0].count),
      totalContacts: Number(totalContacts[0].count),
      unreadContacts: Number(unreadContacts[0].count),
      totalQuotes: Number(totalQuotes[0].count),
      newQuotes: Number(newQuotes[0].count),
      recentContacts: recentContacts.map((c) => ({
        ...c,
        createdAt: c.createdAt ? c.createdAt.toISOString() : new Date().toISOString(),
      })),
      recentQuotes: recentQuotes.map((q) => ({
        ...q,
        createdAt: q.createdAt ? q.createdAt.toISOString() : new Date().toISOString(),
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
