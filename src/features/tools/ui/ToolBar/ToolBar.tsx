import { RadioGroup } from "@headlessui/react";
import { selectTool, setTool, Tool } from "@/entities/tools";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import {
  ButtonRadio,
  IconEraser,
  IconHand,
  IconPencilSquare,
} from "@/shared/ui";
import * as styles from "./ToolBar.css";

export const ToolBar = () => {
  const dispatch = useAppDispatch();
  const currentTool = useAppSelector(selectTool);

  const handleChange = (value: Tool) => {
    dispatch(setTool(value));
  };

  return (
    <RadioGroup
      className={styles.root}
      value={currentTool}
      onChange={handleChange}
    >
      <ButtonRadio value={Tool.drag}>
        <IconHand width={16} height={16} />
      </ButtonRadio>
      <ButtonRadio value={Tool.fill}>
        <IconPencilSquare width={16} height={16} />
      </ButtonRadio>
      <ButtonRadio value={Tool.eraser}>
        <IconEraser width={16} height={16} />
      </ButtonRadio>
    </RadioGroup>
  );
};
