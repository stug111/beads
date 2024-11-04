import {
  Button as ButtonBase,
  type ButtonProps as ButtonBaseProps,
} from "@headlessui/react";
import clsx from "clsx";
import * as styles from "./Button.css";

interface ButtonProps extends ButtonBaseProps {
  size: keyof typeof styles.size;
}

export const Button = (props: ButtonProps) => {
  const { className, size, ...rest } = props;
  return (
    <ButtonBase
      className={clsx(styles.root, styles.size[size], className)}
      {...rest}
    />
  );
};
