import { Radio, type RadioProps } from "@headlessui/react";
import * as styles from "./ButtonRadio.css";

export const ButtonRadio = (props: RadioProps) => {
  const { children, ...rest } = props;
  return (
    <Radio {...rest} className={styles.root}>
      {children}
    </Radio>
  );
};
