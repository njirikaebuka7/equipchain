import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const quoteStatusEnum = pgEnum("quote_status", ["new", "in_review", "responded", "closed"]);

export const quoteRequestsTable = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  otherService: text("other_service"),
  productService: text("product_service"),
  quantity: text("quantity"),
  specification: text("specification"),
  deliveryTimeline: text("delivery_timeline"),
  sourcingType: text("sourcing_type"),
  additionalMessage: text("additional_message"),
  documentUrl: text("document_url"),
  status: quoteStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequestsTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequestsTable.$inferSelect;
