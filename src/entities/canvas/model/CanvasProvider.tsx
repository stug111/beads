import type { Group } from "konva/lib/Group";
import type { Stage } from "konva/lib/Stage";
import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from "react";

interface CanvasContextParams {
  stage: RefObject<Stage>;
  beadPattern: RefObject<Group>;
}

const Context = createContext<CanvasContextParams>({
  stage: { current: null },
  beadPattern: { current: null },
});

export const CanvasProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const stage = useRef<Stage>(null);
  const beadPattern = useRef<Group>(null);

  return (
    <Context.Provider value={{ stage, beadPattern }}>
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvas = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }

  return context;
};
