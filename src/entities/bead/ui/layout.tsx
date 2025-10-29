import type { ReactNode } from "react";

interface BeadLayoutProps {
  children: ReactNode;
  topCenterSlot?: ReactNode;
  topLeftSlot?: ReactNode;
  topRightSlot?: ReactNode;
}

export function Layout({ children, topCenterSlot, topLeftSlot, topRightSlot }: BeadLayoutProps) {
  return (
    <div className="max-h-dvh overflow-hidden relative">
      <div className="absolute top-0 left-2 mt-2">{topLeftSlot}</div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-2 flex justify-center">{topCenterSlot}</div>
      <div className="absolute top-0 right-2 mt-2">{topRightSlot}</div>
      {children}
    </div>
  );
}
