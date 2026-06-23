import { MailCheck, Send } from "lucide-react";
import { PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { messages } from "../data/businessData";

export function MessagesPage() {
  const activeMessage = messages[0];

  return (
    <div>
      <PageHeader
        eyebrow="Communication"
        title="Messages"
        description="Client notes, CarePorter admin updates, care-provider approvals, and finance messages attached to requests and invoices."
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <Panel title="Inbox">
          <div className="divide-y divide-business-line">
            {messages.map((message) => (
              <button key={message.id} className="grid w-full grid-cols-[42px_1fr_auto] gap-3 px-4 py-4 text-left hover:bg-[#fbfaf7]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-xs font-semibold text-business-sea">
                  {message.sender.slice(0, 2)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-business-ink">{message.sender}</span>
                  <span className="mt-0.5 block truncate text-xs font-bold text-slate-500">{message.context}</span>
                  <span className="mt-1 block truncate text-sm text-slate-600">{message.preview}</span>
                </span>
                <span className="text-xs font-bold text-slate-500">{message.time}</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title={activeMessage.sender} action={<StatusBadge tone="coral">{activeMessage.status}</StatusBadge>}>
          <div className="p-4">
            <div className="rounded-lg border border-business-line bg-white p-4">
              <p className="text-sm font-semibold leading-7 text-slate-700">{activeMessage.preview}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{activeMessage.context}</p>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-business-ink px-3 text-sm font-medium text-white">
                <Send className="h-4 w-4" />
                Reply
              </button>
              <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white px-3 text-sm font-medium">
                <MailCheck className="h-4 w-4" />
                Mark resolved
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
