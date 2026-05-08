import { Logo } from './Logo';

const BOOKING_URL = 'https://cal.com/adham-hamza/fit-assessment';

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-white/[0.04]">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Logo size="nav" />
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-ivory shadow-[0_0_0_1px_rgba(201,169,110,0.3)] hover:opacity-95 transition"
          >
            Book a fit assessment
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
