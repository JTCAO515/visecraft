import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { requireAuthenticatedUser } from "@/lib/auth/user";

export default async function WorkspacePage() {
  const user = await requireAuthenticatedUser();

  return <WorkspaceShell user={user} />;
}
