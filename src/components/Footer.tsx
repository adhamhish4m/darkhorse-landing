import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 py-8">
        <div className="flex items-center justify-between">
          <Logo size="footer" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ivory/40">
            London · MMXXVI
          </span>
        </div>
      </div>
    </footer>
  );
}
