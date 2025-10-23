import { createBeadApplication } from "./bead-application";
import { createGrid } from "./grid";
import { createViewport } from "./viewport";

export async function initialBoard({ resizeTo = window }: { resizeTo?: HTMLElement | Window }) {
  const app = await createBeadApplication({ resizeTo });
  createViewport(app);

  createGrid(app);

  return app;
}
