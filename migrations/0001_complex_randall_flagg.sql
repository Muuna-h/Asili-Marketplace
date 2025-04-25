ALTER TABLE "orders" ADD COLUMN "payment_method" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "mpesa_code" text;