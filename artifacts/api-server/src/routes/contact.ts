import { Router } from "express";
import { db } from "@workspace/db";
import { contactSubmissionsTable } from "@workspace/db";
import { eq, desc, sql, and, ilike, or } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// Public: submit contact form
router.post("/contact", async (req, res) => {
  try {
    const { fullName, companyName, email, phone, inquiryType, message } = req.body;

    if (!fullName || !email || !message) {
      res.status(400).json({ error: "Full name, email, and message are required" });
      return;
    }

    await db.insert(contactSubmissionsTable).values({
      fullName,
      companyName: companyName || null,
      email,
      phone: phone || null,
      inquiryType: inquiryType || null,
      message,
    });

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: list contact submissions
router.get("/contact", requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (status === "unread") {
      conditions.push(eq(contactSubmissionsTable.isRead, false));
    } else if (status === "read") {
      conditions.push(eq(contactSubmissionsTable.isRead, true));
    }
    if (search) {
      conditions.push(
        or(
          ilike(contactSubmissionsTable.fullName, `%${search}%`),
          ilike(contactSubmissionsTable.email, `%${search}%`),
          ilike(contactSubmissionsTable.companyName, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [submissions, countResult] = await Promise.all([
      db
        .select()
        .from(contactSubmissionsTable)
        .where(whereClause)
        .orderBy(desc(contactSubmissionsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(contactSubmissionsTable).where(whereClause),
    ]);

    res.json({
      submissions: submissions.map(serializeContact),
      total: Number(countResult[0].count),
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get contact by id
router.get("/contact/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [submission] = await db
      .select()
      .from(contactSubmissionsTable)
      .where(eq(contactSubmissionsTable.id, id))
      .limit(1);

    if (!submission) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(serializeContact(submission));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: mark as read/unread
router.patch("/contact/:id/read", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { isRead } = req.body;

    const [updated] = await db
      .update(contactSubmissionsTable)
      .set({ isRead })
      .where(eq(contactSubmissionsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(serializeContact(updated));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete contact
router.delete("/contact/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(contactSubmissionsTable).where(eq(contactSubmissionsTable.id, id));
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

function serializeContact(c: any) {
  return {
    ...c,
    createdAt: c.createdAt ? c.createdAt.toISOString() : new Date().toISOString(),
  };
}

export default router;
