ALTER TABLE "account" DROP CONSTRAINT "account_type_provider_account_id";
ALTER TABLE "account" ADD COLUMN "provider" text NOT NULL;
ALTER TABLE "account" ADD CONSTRAINT "account_provider_provider_account_id" PRIMARY KEY("provider","provider_account_id");