const BOOKING_URL = 'https://cal.com/adham-hamza/fit-assessment';

export function ClosingSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-14 py-24 sm:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 30%, rgba(157,106,221,0.10) 0%, transparent 60%)',
        }}
      />
      <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="hairline w-6" />
            <span className="font-sans font-medium text-[11px] tracking-[0.32em] uppercase text-champagne">
              FIT CHECK
            </span>
          </div>
          <h2 className="font-display italic font-normal text-[52px] sm:text-[64px] lg:text-[80px] leading-[0.96] tracking-[-0.02em] text-ivory mb-5">
            Let's see if
            <br />
            <em className="italic text-champagne">we fit</em>.
          </h2>
          <p className="font-display italic text-[19px] sm:text-[22px] leading-[1.4] text-ivory/85 mb-8">
            A short call. No pitch deck. Either we're a match or we're not.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-ivory shadow-[0_0_0_1px_rgba(201,169,110,0.3)] hover:opacity-95 transition"
          >
            Book a fit assessment
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* RIGHT — letter card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 lg:p-12">
          <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.18em] uppercase mb-5">
            <span className="text-champagne">FROM ADHAM</span>
            <span className="text-ivory/40">LDN · 2026</span>
          </div>
          <p className="font-display text-[16px] sm:text-[17px] leading-[1.65] text-ivory/85 mb-7">
            Most cold email looks the same because it's all built the same — junior, scaled, templated. I do mine by hand. Lists, copy, sending, replies — all me. If your offer is solid, I'll get it in front of the right people.
          </p>
          <div className="font-hand text-[36px] sm:text-[40px] text-ivory leading-none mb-1">
            Adham
          </div>
          <div className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            FOUNDER · LEAD THIRTEEN
          </div>
        </div>
      </div>
    </section>
  );
}
