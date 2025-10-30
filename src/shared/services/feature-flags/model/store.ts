import { env } from "../../../config";
import { createSignal } from "../../../lib";

export const selectAreaFeature = createSignal(env.isDev);
