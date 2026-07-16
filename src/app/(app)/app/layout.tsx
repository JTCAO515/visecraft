import { AppUiProvider } from "@/components/ui/app-ui-provider";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppUiProvider>{children}</AppUiProvider>;
}
