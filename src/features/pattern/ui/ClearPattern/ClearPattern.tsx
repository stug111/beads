import { clearPattern } from "@/entities/pattern";
import { useAppDispatch } from "@/shared/model";

export const ClearPattern = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clearPattern());
  };
  return (
    <button type="button" onClick={handleClick}>
      Clear Pattern
    </button>
  );
};
