import type { PropsWithChildren } from "react";
import * as styles from "./Section.css";

interface SectionProps {
  title?: string;
}

export const Section = (props: PropsWithChildren<SectionProps>) => {
  const { title, children } = props;
  return (
    <div className={styles.root}>
      {title && <h4 className={styles.title}>{title}</h4>}
      {children}
    </div>
  );
};
