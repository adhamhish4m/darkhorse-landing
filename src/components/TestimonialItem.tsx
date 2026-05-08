type BaseProps = {
  index: number;       // 1-indexed slot number (01, 02, 03, 04)
  reverse?: boolean;   // when true, visual is on the left, content on the right
  pullQuote: string;
  fullQuote: string;   // for hover/title attribute
  name: string;
  role: string;
  attribution?: string; // small italic footnote under name (Randy only)
};

type VideoProps = BaseProps & {
  kind: 'video';
  youtubeId: string;
};

type WrittenProps = BaseProps & {
  kind: 'written';
};

export type TestimonialItemProps = VideoProps | WrittenProps;

export function TestimonialItem(props: TestimonialItemProps) {
  const numberLabel = `${String(props.index).padStart(2, '0')} — ${props.kind === 'video' ? 'VIDEO' : 'WRITTEN'}`;
  return (
    <div className="border-t border-white/[0.06] py-12 sm:py-14">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center ${props.reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="space-y-4">
          <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-champagne">
            {numberLabel}
          </div>
          <p
            className="font-display italic text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.32] text-ivory"
            title={props.fullQuote}
          >
            "{props.pullQuote}"
          </p>
          <div className="pt-2">
            <p className="font-display italic font-medium text-[19px] sm:text-[21px] text-ivory leading-tight">
              {props.name}
            </p>
            <p className="font-sans text-[12px] tracking-[0.12em] uppercase text-muted-foreground mt-1">
              {props.role}
            </p>
            {props.attribution && (
              <p className="font-display italic text-[16px] sm:text-[17px] text-champagne mt-3 leading-snug">
                — {props.attribution}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
          {props.kind === 'video' ? (
            <div className="relative" style={{ paddingBottom: '62.5%' /* 16:10 */ }}>
              <iframe
                title={`${props.name} testimonial`}
                src={`https://www.youtube.com/embed/${props.youtubeId}?modestbranding=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          ) : (
            <div className="aspect-[16/10] flex items-center justify-center p-10 lg:p-14 bg-primary/[0.05]">
              <p className="font-display italic text-[22px] sm:text-[26px] leading-[1.4] text-ivory/85 text-center">
                "{props.pullQuote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
