import { cn } from '../lib/utils';

type LogoProps = {
  size?: 'nav' | 'display' | 'footer';
  className?: string;
};

const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
  nav: 'text-[28px] sm:text-[32px]',
  display: 'text-[64px] md:text-[78px]',
  footer: 'text-[18px] sm:text-[20px]',
};

export function Logo({ size = 'nav', className }: LogoProps) {
  return (
    <span
      className={cn(
        'font-display font-medium leading-none tracking-[-0.01em] text-ivory lowercase',
        sizeClasses[size],
        className,
      )}
    >
      <span className="text-champagne">v</span>antage
    </span>
  );
}
