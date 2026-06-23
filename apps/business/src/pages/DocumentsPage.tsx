import { FileUp, ShieldAlert } from "lucide-react";
import { TrustFrameworkPanel } from "../components/TrustFrameworkPanel";
import { FieldLabel, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { documents } from "../data/businessData";

function documentTone(status: string) {
  if (status === "Current") return "green" as const;
  if (status === "Expires soon") return "amber" as const;
  return "coral" as const;
}

export function DocumentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Verification"
        title="Verification"
        description="Track your CarePorter trust level, upload compliance documents, and level up to Aged Care Ready."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-business-ink px-3.5 text-sm font-medium text-white">
            <FileUp className="h-4 w-4" />
            Upload
          </button>
        }
      />

      <TrustFrameworkPanel className="mt-6" />

      <Panel className="mt-5" title="Verification documents">
        <div className="divide-y divide-business-line">
          {documents.map((document) => (
            <div key={document.name} className="grid gap-4 px-4 py-4 md:grid-cols-[42px_1fr_160px_150px_auto] md:items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-business-coral">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-semibold text-business-ink">{document.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{document.type}</p>
              </div>
              <FieldLabel label="Expiry" value={document.expires} />
              <StatusBadge tone={documentTone(document.status)}>{document.status}</StatusBadge>
              <button className="min-h-9 rounded-full border border-black/[0.12] bg-white px-3 text-sm font-medium">Open</button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
