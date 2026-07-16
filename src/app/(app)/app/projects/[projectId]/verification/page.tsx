import { notFound } from "next/navigation";
import { VerificationDashboard } from "@/components/verification/verification-dashboard";
import { getVisePandaVerificationReport } from "@/lib/proof/demo/visepanda-proof-demo";

export const dynamic = "force-dynamic";

export default async function ProjectVerificationPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  if (projectId !== "visepanda-demo") {
    notFound();
  }

  const report = await getVisePandaVerificationReport();

  return <VerificationDashboard projectId={projectId} report={report} />;
}
