import { toast as sonnerToast } from "sonner";
import { Callout, type CalloutProps } from "../ui";

type ToastOptions = Pick<CalloutProps, "variant">;

export function toast(message: string, options: ToastOptions = {}) {
  sonnerToast.custom(() => <Callout variant={options.variant}>{message}</Callout>);
}
