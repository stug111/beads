import { db, schema } from "../../../shared/config";
import type { BeadCellId } from "../lib/bead-cell-id";

interface SaveTemplate {
  rows: number;
  cols: number;
  name: string;
  cells: Record<BeadCellId, { color: string }>[];
  preview: string;
}

export async function saveTemplate(template: SaveTemplate) {
  await db.insert(schema.templates).values({
    rows: template.rows,
    cols: template.cols,
    name: template.name,
    cells: template.cells,
    preview: template.preview,
  });
}
