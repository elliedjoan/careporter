import { FileUp, ShieldAlert } from "lucide-react";
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
        title="Documents"
        description="Upload the documents CarePorter needs to verify your vendor profile and keep your service visible to clients."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-business-ink px-3.5 text-sm font-bold text-white">
            <FileUp className="h-4 w-4" />
            Upload
          </button>
        }
      />

      <Panel className="mt-6" title="Verification documents">
        <div className="divide-y divide-business-line">
          {documents.map((document) => (
            <div key={document.name} className="grid gap-4 px-4 py-4 md:grid-cols-[42px_1fr_160px_150px_auto] md:items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-business-mist text-business-coral">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-black text-business-ink">{document.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{document.type}</p>
              </div>
              <FieldLabel label="Expiry" value={document.expires} />
              <StatusBadge tone={documentTone(document.status)}>{document.status}</StatusBadge>
              <button className="min-h-9 rounded-lg border border-business-line bg-white px-3 text-sm font-bold">Open</button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
