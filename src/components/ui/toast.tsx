"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

export type ToastTone = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
};

type ToastItem = ToastInput & { id: string };

type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const subscribeToMount = () => () => undefined;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { tone: "info", duration: 5000, ...input, id }]);
    return id;
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [dismiss, toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <div
              aria-atomic="false"
              aria-live="polite"
              className="fixed bottom-5 right-5 z-[100] grid w-[min(390px,calc(100vw-2.5rem))] gap-3"
            >
              {toasts.map((item) => (
                <Toast key={item.id} item={item} onDismiss={dismiss} />
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }
  return context;
}

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  useEffect(() => {
    if (!item.duration || item.duration <= 0) return;
    const timer = window.setTimeout(() => onDismiss(item.id), item.duration);
    return () => window.clearTimeout(timer);
  }, [item.duration, item.id, onDismiss]);

  const tone = item.tone ?? "info";
  const toneColor = tone === "success" ? "var(--jade)" : tone === "error" ? "var(--rose)" : "var(--blue)";
  const Icon = tone === "success" ? CheckCircle2 : tone === "error" ? XCircle : Info;

  return (
    <div
      className="grid grid-cols-[20px_1fr_32px] gap-3 border bg-[var(--bg1)] p-4 text-[var(--text)]"
      role={tone === "error" ? "alert" : "status"}
      style={{ borderColor: toneColor, borderRadius: "var(--radius-md)" }}
    >
      <Icon aria-hidden="true" size={18} style={{ color: toneColor }} />
      <div>
        <p className="text-sm font-semibold">{item.title}</p>
        {item.description ? <p className="mt-1 text-xs leading-5 text-[var(--text-dim)]">{item.description}</p> : null}
      </div>
      <button
        aria-label="Dismiss notification"
        className="inline-flex size-8 items-center justify-center text-[var(--text-faint)] hover:text-[var(--text)]"
        onClick={() => onDismiss(item.id)}
        type="button"
      >
        <X aria-hidden="true" size={15} />
      </button>
    </div>
  );
}
