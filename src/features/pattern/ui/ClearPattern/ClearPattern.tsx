import { Button } from "@headlessui/react";
import { clearPattern } from "@/entities/pattern";
import { useAppDispatch } from "@/shared/model";
import { IconTrash } from "@/shared/ui";
import * as styles from "./ClearPattern.css";

export const ClearPattern = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clearPattern());
  };
  return (
    <Button className={styles.root} type="button" onClick={handleClick}>
      <IconTrash width={20} height={20} />
    </Button>
  );
};
