import { notFound } from "next/navigation";
import { VerificationReportView } from "@/components/verification/verification-report";
import { findVisePandaClaimReport, getVisePandaVerificationReport } from "@/lib/proof/demo/visepanda-proof-demo";

export const dynamic = "force-dynamic";

export default async function ClaimVerificationReportPage({
  params,
}: {
  params: Promise<{ projectId: string; claimId: string }>;
}) {
  const { projectId, claimId } = await params;

  if (projectId !== "visepanda-demo") {
    notFound();
  }

  const report = await getVisePandaVerificationReport();
  const claimReport = findVisePandaClaimReport(report, claimId);

  if (!claimReport) {
    notFound();
  }

  return (
    <VerificationReportView
      projectId={projectId}
      claim={claimReport.claim}
      result={claimReport.result}
      evidence={claimReport.evidence}
    />
  );
}
