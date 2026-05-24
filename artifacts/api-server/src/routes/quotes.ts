import { Router } from "express";
import { db } from "@workspace/db";
import { quoteRequestsTable } from "@workspace/db";
import { eq, desc, sql, and, ilike, or } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// Public: submit quote request
router.post("/quotes", async (req, res) => {
  try {
    const {
      fullName, companyName, email, phone, serviceType, otherService,
      productService, quantity, specification, deliveryTimeline, sourcingType,
      additionalMessage, documentUrl,
    } = req.body;

    if (!fullName || !email || !serviceType) {
      res.status(400).json({ error: "Full name, email, and service type are required" });
      return;
    }

    await db.insert(quoteRequestsTable).values({
      fullName,
      companyName: companyName || null,
      email,
      phone: phone || null,
      serviceType,
      otherService: otherService || null,
      productService: productService || null,
      quantity: quantity || null,
      specification: specification || null,
      deliveryTimeline: deliveryTimeline || null,
      sourcingType: sourcingType || null,
      additionalMessage: additionalMessage || null,
      documentUrl: documentUrl || null,
    });

    res.status(201).json({ message: "Quote request submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: list quote requests
router.get("/quotes", requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (status) {
      conditions.push(eq(quoteRequestsTable.status, status as any));
    }
    if (search) {
      conditions.push(
        or(
          ilike(quoteRequestsTable.fullName, `%${search}%`),
          ilike(quoteRequestsTable.email, `%${search}%`),
          ilike(quoteRequestsTable.companyName, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [requests, countResult] = await Promise.all([
      db
        .select()
        .from(quoteRequestsTable)
        .where(whereClause)
        .orderBy(desc(quoteRequestsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(quoteRequestsTable).where(whereClause),
    ]);

    res.json({
      requests: requests.map(serializeQuote),
      total: Number(countResult[0].count),
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get quote by id
router.get("/quotes/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [request] = await db
      .select()
      .from(quoteRequestsTable)
      .where(eq(quoteRequestsTable.id, id))
      .limit(1);

    if (!request) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(serializeQuote(request));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update quote status
router.patch("/quotes/:id/status", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const [updated] = await db
      .update(quoteRequestsTable)
      .set({ status })
      .where(eq(quoteRequestsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(serializeQuote(updated));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete quote
router.delete("/quotes/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(quoteRequestsTable).where(eq(quoteRequestsTable.id, id));
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

function serializeQuote(q: any) {
  return {
    ...q,
    createdAt: q.createdAt ? q.createdAt.toISOString() : new Date().toISOString(),
  };
}

export default router;
