import { cn } from '../lib/utils';

type LogoProps = {
  size?: 'nav' | 'display' | 'footer';
  className?: string;
  /** 'dark' = bone logotype for dark grounds, 'light' = ink logotype for light grounds */
  ground?: 'dark' | 'light';
};

const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
  nav: 'h-[22px] sm:h-[26px]',
  display: 'h-[52px] md:h-[64px]',
  footer: 'h-[16px] sm:h-[18px]',
};

/**
 * The drawn `dark horse ai` logotype. It is never re-typed — always the SVG.
 * Source: public/brand/wordmark-{dark,light}.svg (canonical: aios/outputs/darkhorse-brand/logo/).
 */
export function Logo({ size = 'nav', className, ground = 'light' }: LogoProps) {
  return (
    <img
      src={`/brand/wordmark-${ground}.svg`}
      alt="dark horse ai"
      className={cn('block w-auto', sizeClasses[size], className)}
    />
  );
}
