ALTER TABLE "menu" RENAME COLUMN "resturant" TO "resturantId";--> statement-breakpoint
ALTER TABLE "menu" DROP CONSTRAINT "menu_resturant_resturant_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu" ADD CONSTRAINT "menu_resturantId_resturant_id_fk" FOREIGN KEY ("resturantId") REFERENCES "public"."resturant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
