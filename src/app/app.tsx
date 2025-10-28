import { ErrorBoundary } from "react-error-boundary";
import { BeadPage } from "../entities/bead";
// import { BeadCanvas } from "../entities/bead-function";
// import { BeadCanvas } from "../entities/bead-class";

function fallbackRender({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <BeadPage />
    </ErrorBoundary>
  );
}
