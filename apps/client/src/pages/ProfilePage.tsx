import { Bell, HeartPulse, Mail, Phone, UserRound } from "lucide-react";

export function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-[-0.055em]">Profile</h1>
      <p className="mt-3 text-porter-ink/65">Personal details, emergency contacts, saved provider details, and communication preferences.</p>

      <div className="mt-8 grid gap-5">
        <Panel icon={<UserRound />} title="Personal information">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Full name" value="Margaret Thompson" />
            <Field label="Preferred name" value="Maggie" />
            <Field label="Date of birth" value="14 March 1947" />
            <Field label="Suburb" value="New Farm, QLD" />
          </div>
        </Panel>
        <Panel icon={<Phone />} title="Contact details">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Mobile" value="+61 412 555 018" />
            <Field label="Email" value="maggie.thompson@example.com" />
          </div>
        </Panel>
        <Panel icon={<HeartPulse />} title="Emergency contacts">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Primary contact" value="Sarah Thompson, daughter" />
            <Field label="Phone" value="+61 418 555 904" />
          </div>
        </Panel>
        <Panel icon={<Mail />} title="Saved provider">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Company" value="BrightPath Care Packages" />
            <Field label="Contact" value="Emma Wilson" />
            <Field label="Approval email" value="approvals@brightpath.com.au" />
            <Field label="Accounts email" value="finance@brightpath.com.au" />
          </div>
        </Panel>
        <Panel icon={<Bell />} title="Communication preferences">
          <div className="grid gap-3 md:grid-cols-3">
            {["Email updates", "SMS reminders", "Family copied on progress notes"].map((item) => (
              <label key={item} className="flex min-h-12 items-center justify-between rounded-lg border border-black/[0.08] bg-white px-4 font-medium">
                {item}
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#111411]" />
              </label>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-black/[0.08] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#111411]">{icon}</span>
        <h2 className="text-xl font-semibold tracking-[-0.03em]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-porter-ink/58">
      {label}
      <input className="min-h-12 rounded-lg border border-black/[0.08] bg-white px-3 font-medium text-porter-ink outline-none focus:border-[#111411]" defaultValue={value} />
    </label>
  );
}
