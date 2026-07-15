"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";

export function AppUiProvider({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
