CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'scheduled');--> statement-breakpoint
CREATE TYPE "public"."quote_status" AS ENUM('new', 'in_review', 'responded', 'closed');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"category" text,
	"tags" text,
	"featured_image" text,
	"excerpt" text,
	"content" text,
	"seo_title" text,
	"seo_description" text,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"author" text,
	"published_at" timestamp,
	"scheduled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"company_name" text,
	"email" text NOT NULL,
	"phone" text,
	"inquiry_type" text,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"company_name" text,
	"email" text NOT NULL,
	"phone" text,
	"service_type" text NOT NULL,
	"other_service" text,
	"product_service" text,
	"quantity" text,
	"specification" text,
	"delivery_timeline" text,
	"sourcing_type" text,
	"additional_message" text,
	"document_url" text,
	"status" "quote_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" text,
	"email" text,
	"address" text,
	"business_hours" text,
	"facebook_url" text,
	"twitter_url" text,
	"linkedin_url" text,
	"instagram_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
