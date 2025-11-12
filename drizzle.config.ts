import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/shared/config/db/schema/index.ts",
  out: "./src/shared/config/db/migrations",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_vnYX3LN7MRpk@ep-falling-sunset-abf1samn.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
