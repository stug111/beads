import type { ChangeEvent } from "react";
import { changeSize, selectSize } from "@/entities/settings";
import { useAppDispatch, useAppSelector } from "@/shared/model";

interface ChangeSizeProps {
  type: "rows" | "columns";
}

export const ChangeSize = (props: ChangeSizeProps) => {
  const { type } = props;

  const dispatch = useAppDispatch();
  const size = useAppSelector(selectSize);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSize({ type, value: Number(e.target.value) || 0 }));
  };

  return (
    <fieldset>
      <label>Кол-во строк</label>
      <input value={size[type]} onChange={handleChange} />
    </fieldset>
  );
};
