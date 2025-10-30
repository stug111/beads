import { selectAreaFeature } from "./store";

export function useFeatureFlags() {
  return {
    selectAreaFeature: selectAreaFeature(),
  };
}
