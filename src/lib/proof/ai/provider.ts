import type { DeterministicCheck, EvidenceItem, ProofClaim, VerificationAIOutput } from "@/lib/proof/types";

export type ProofEvidencePacket = {
  claim: ProofClaim;
  evidence: EvidenceItem[];
  deterministicChecks: DeterministicCheck[];
};

export type ProofAIProvider = {
  provider: string;
  model: string;
  promptVersion: string;
  verifyClaim(packet: ProofEvidencePacket): Promise<VerificationAIOutput>;
};
