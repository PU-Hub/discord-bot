CREATE TABLE IF NOT EXISTS "menu" (
	"resturant" text,
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"note" text NOT NULL,
	"tags" text[] NOT NULL,
	"description" text NOT NULL,
	"imageUrl" text,
	"price" integer,
	"vegan" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resturant" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu" ADD CONSTRAINT "menu_resturant_resturant_id_fk" FOREIGN KEY ("resturant") REFERENCES "public"."resturant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
