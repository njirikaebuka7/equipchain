import { Router } from "express";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db";
import { eq, desc, sql, and, ilike } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// Public: list published posts
router.get("/blog/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string | undefined;
    const offset = (page - 1) * limit;

    const now = new Date();

    const conditions = [
      sql`(${blogPostsTable.status} = 'published' AND (${blogPostsTable.publishedAt} IS NULL OR ${blogPostsTable.publishedAt} <= ${now}))`,
    ];

    if (category) {
      conditions.push(eq(blogPostsTable.category, category));
    }

    const [posts, countResult] = await Promise.all([
      db
        .select()
        .from(blogPostsTable)
        .where(and(...conditions))
        .orderBy(desc(blogPostsTable.publishedAt), desc(blogPostsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(blogPostsTable)
        .where(and(...conditions)),
    ]);

    res.json({
      posts: posts.map(serializePost),
      total: Number(countResult[0].count),
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: list all posts including drafts
router.get("/blog/posts/admin", requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (status) {
      conditions.push(eq(blogPostsTable.status, status as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [posts, countResult] = await Promise.all([
      db
        .select()
        .from(blogPostsTable)
        .where(whereClause)
        .orderBy(desc(blogPostsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(blogPostsTable)
        .where(whereClause),
    ]);

    res.json({
      posts: posts.map(serializePost),
      total: Number(countResult[0].count),
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get single post by ID (for editing)
router.get("/blog/posts/admin/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid post ID" });
      return;
    }

    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, id))
      .limit(1);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(serializePost(post));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Public: get post by slug
router.get("/blog/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const now = new Date();

    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    // If not admin session, only show published posts that are past their publish date
    if (
      post.status !== "published" ||
      (post.publishedAt && post.publishedAt > now)
    ) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(serializePost(post));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: create post
router.post("/blog/posts", requireAuth, async (req, res) => {
  try {
    const { title, slug, category, tags, featuredImage, excerpt, content, seoTitle, seoDescription, status, author, scheduledAt } = req.body;

    if (!title || !slug) {
      res.status(400).json({ error: "Title and slug are required" });
      return;
    }

    const publishedAt = status === "published" ? new Date() : null;

    const [post] = await db
      .insert(blogPostsTable)
      .values({
        title,
        slug,
        category: category || null,
        tags: tags || null,
        featuredImage: featuredImage || null,
        excerpt: excerpt || null,
        content: content || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        status: status || "draft",
        author: author || null,
        publishedAt,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      })
      .returning();

    res.status(201).json(serializePost(post));
  } catch (err: any) {
    if (err.code === "23505") {
      res.status(400).json({ error: "Slug already exists" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update post
router.put("/blog/posts/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, slug, category, tags, featuredImage, excerpt, content, seoTitle, seoDescription, status, author, scheduledAt } = req.body;

    const existing = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id)).limit(1);
    if (!existing[0]) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    let publishedAt = existing[0].publishedAt;
    if (status === "published" && existing[0].status !== "published") {
      publishedAt = new Date();
    }

    const [updated] = await db
      .update(blogPostsTable)
      .set({
        title: title ?? existing[0].title,
        slug: slug ?? existing[0].slug,
        category: category !== undefined ? category : existing[0].category,
        tags: tags !== undefined ? tags : existing[0].tags,
        featuredImage: featuredImage !== undefined ? featuredImage : existing[0].featuredImage,
        excerpt: excerpt !== undefined ? excerpt : existing[0].excerpt,
        content: content !== undefined ? content : existing[0].content,
        seoTitle: seoTitle !== undefined ? seoTitle : existing[0].seoTitle,
        seoDescription: seoDescription !== undefined ? seoDescription : existing[0].seoDescription,
        status: status ?? existing[0].status,
        author: author !== undefined ? author : existing[0].author,
        publishedAt,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : existing[0].scheduledAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPostsTable.id, id))
      .returning();

    res.json(serializePost(updated));
  } catch (err: any) {
    if (err.code === "23505") {
      res.status(400).json({ error: "Slug already exists" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete post
router.delete("/blog/posts/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: toggle publish status
router.patch("/blog/posts/:id/publish", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    const { status } = req.body;

    const existing = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id)).limit(1);
    if (!existing[0]) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    let publishedAt = existing[0].publishedAt;
    if (status === "published" && existing[0].status !== "published") {
      publishedAt = new Date();
    }

    const [updated] = await db
      .update(blogPostsTable)
      .set({ status, publishedAt, updatedAt: new Date() })
      .where(eq(blogPostsTable.id, id))
      .returning();

    res.json(serializePost(updated));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Public: list categories
router.get("/blog/categories", async (_req, res) => {
  try {
    const result = await db
      .selectDistinct({ category: blogPostsTable.category })
      .from(blogPostsTable)
      .where(sql`${blogPostsTable.category} IS NOT NULL AND ${blogPostsTable.status} = 'published'`);

    res.json(result.map((r) => r.category).filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: blog stats
router.get("/blog/stats", requireAuth, async (_req, res) => {
  try {
    const [total, published, drafts, scheduled] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(blogPostsTable),
      db.select({ count: sql<number>`count(*)` }).from(blogPostsTable).where(eq(blogPostsTable.status, "published")),
      db.select({ count: sql<number>`count(*)` }).from(blogPostsTable).where(eq(blogPostsTable.status, "draft")),
      db.select({ count: sql<number>`count(*)` }).from(blogPostsTable).where(eq(blogPostsTable.status, "scheduled")),
    ]);

    res.json({
      total: Number(total[0].count),
      published: Number(published[0].count),
      drafts: Number(drafts[0].count),
      scheduled: Number(scheduled[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

function serializePost(post: any) {
  return {
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    scheduledAt: post.scheduledAt ? post.scheduledAt.toISOString() : null,
    createdAt: post.createdAt ? post.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : new Date().toISOString(),
  };
}

export default router;
