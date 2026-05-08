import { cn } from '../lib/utils';

type LogoProps = {
  size?: 'nav' | 'display' | 'footer';
  className?: string;
};

const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
  nav: 'text-[22px] sm:text-[24px]',
  display: 'text-[64px] md:text-[78px]',
  footer: 'text-[18px] sm:text-[20px]',
};

export function Logo({ size = 'nav', className }: LogoProps) {
  return (
    <span
      className={cn(
        'font-display italic font-medium leading-none tracking-[-0.01em] text-ivory lowercase',
        sizeClasses[size],
        className,
      )}
    >
      lead thirteen
      <span
        className="text-champagne"
        style={{ fontSize: '1.6em', lineHeight: 0, verticalAlign: 0, marginLeft: '-0.04em' }}
      >
        .
      </span>
    </span>
  );
}
