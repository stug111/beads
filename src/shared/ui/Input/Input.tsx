import {
  Field,
  Input as InputBase,
  Label,
  type InputProps as InputBaseProps,
} from "@headlessui/react";
import * as styles from "./Input.css";

interface InputProps extends InputBaseProps {
  label?: string;
}

export const Input = (props: InputProps) => {
  const { label, ...rest } = props;
  return (
    <Field className={styles.root}>
      {label && <Label className={styles.label}>{label}</Label>}
      <InputBase {...rest} className={styles.input} />
    </Field>
  );
};
