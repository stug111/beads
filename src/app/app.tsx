import { ErrorBoundary } from "react-error-boundary";
import { BeadCanvas, BeadProvider } from "../entities/bead";

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
      <BeadProvider>
        <BeadCanvas />
      </BeadProvider>
    </ErrorBoundary>
  );
}
