import { Callout as CalloutUI } from "@radix-ui/themes";
import type { ReactNode } from "react";

export interface CalloutProps {
  children?: ReactNode;
  variant?: "blue" | "green" | "red" | "yellow";
}

export function Callout({ children, variant = "blue" }: CalloutProps) {
  return (
    <CalloutUI.Root color={variant}>
      <CalloutUI.Text>{children}</CalloutUI.Text>
    </CalloutUI.Root>
  );
}
