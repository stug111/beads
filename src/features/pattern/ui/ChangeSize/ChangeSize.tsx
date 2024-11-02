import type { ChangeEvent } from "react";
import { changeSize, selectSize } from "@/entities/pattern";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { Input } from "@/shared/ui";

interface ChangeSizeProps {
  type: "rows" | "columns";
  label?: string;
}

export const ChangeSize = (props: ChangeSizeProps) => {
  const { type, label } = props;

  const dispatch = useAppDispatch();
  const size = useAppSelector(selectSize);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSize({ type, value: Number(e.target.value) || 0 }));
  };

  return (
    <Input
      type="number"
      label={label}
      value={size[type]}
      onChange={handleChange}
    />
  );
};
