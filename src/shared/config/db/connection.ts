import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { env } from "../env";

const client = neon(env.databaseUrl, {
  disableWarningInBrowsers: true,
});
export const db = drizzle({ client, schema });
