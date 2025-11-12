import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";
type BeadCellId = `${number}:${number}`;

export const templates = pgTable("templates", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  rows: integer().notNull(),
  cols: integer().notNull(),
  cells: json().$type<Record<BeadCellId, { color: string }>[]>().notNull(),
  preview: varchar().notNull(),
});

export type Template = typeof templates.$inferSelect;
