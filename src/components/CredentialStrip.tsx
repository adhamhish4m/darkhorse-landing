type Credential = {
  label: string;
  body: React.ReactNode;
};

const CREDENTIALS: Credential[] = [
  {
    label: 'CURRENTLY',
    body: 'AI Research Engineer',
  },
  {
    label: 'EDUCATION',
    body: (
      <>
        Computer Science · AI ·{' '}
        <em className="italic text-champagne">Top-100 University</em>
      </>
    ),
  },
  {
    label: 'CERTIFIED',
    body: 'AI Consultant',
  },
  {
    label: 'LIVING PROOF',
    body: (
      <>
        Running my own agency on the{' '}
        <em className="italic text-champagne">same AIOS</em> I'd build for you
      </>
    ),
  },
];

export function CredentialStrip() {
  return (
    <section className="px-6 sm:px-10 lg:px-14 py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-sans font-medium text-[13px] tracking-[0.32em] uppercase text-champagne mb-4">
          — THE BUILDER
        </div>
        <h2 className="font-display italic font-normal text-[48px] sm:text-[58px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ivory mb-10 sm:mb-12">
          Built by an <em className="italic text-champagne">engineer</em>.
        </h2>
        <div className="border-t border-white/[0.08]">
          {CREDENTIALS.map(({ label, body }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 py-6 sm:py-7 border-b border-white/[0.08]"
            >
              <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-ivory/40 sm:w-[160px] sm:flex-shrink-0">
                {label}
              </div>
              <div className="font-display italic text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.3] text-ivory/95">
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
