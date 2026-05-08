import { TestimonialItem } from './TestimonialItem';
import type { TestimonialItemProps } from './TestimonialItem';

const ITEMS: TestimonialItemProps[] = [
  {
    index: 1,
    kind: 'video',
    youtubeId: 'V0uXW7PsV0U',
    pullQuote: 'The process has been smooth and the results speak for themselves.',
    fullQuote: "Adham has done excellent marketing work for us. He's knowledgeable, easy to communicate with, and very professional. The process has been smooth and the results speak for themselves. I'd absolutely recommend him.",
    name: 'Randy Clarke',
    role: 'CEO · Go Janitorial',
    attribution: 'first client closed in our first month working together',
  },
  {
    index: 2,
    kind: 'video',
    youtubeId: 'N1JtDzzi_9A',
    pullQuote: 'You took it personal to get me results.',
    fullQuote: 'I appreciate your honesty, hard work, and commitment — because you really showed that you follow through with what you tell people you can do for them. Appreciate all your selflessness because you took it personal to get me results. Thank you for your hard work and I look forward to more business with you.',
    name: 'Vince Ozonoh',
    role: 'Founder · TaskSpaceAI',
    reverse: true,
  },
  {
    index: 3,
    kind: 'written',
    pullQuote: 'Deep technical knowledge with a strong grasp of compliance-sensitive workflows. Highly recommend.',
    fullQuote: 'Working with Adham has been a game changer. He combined deep technical knowledge with a strong grasp of compliance-sensitive workflows, helping us create a solution that genuinely reduces admin time and improves accuracy for advisers. Highly recommend.',
    name: 'Alessandro Tolomeo',
    role: 'Founder · ID MATTER AI',
  },
  {
    index: 4,
    kind: 'written',
    pullQuote: "Reliable, easy to work with, and the quality exceeded what I expected.",
    fullQuote: "You've been very reliable, easy to work with and the quality of what you produced has exceeded what I expected! I really appreciate the effort you've put in and would recommend you to anyone!",
    name: 'Jordan Hopkins',
    role: 'Founder · ITK UK',
    reverse: true,
  },
];

export function TestimonialStack() {
  return (
    <section className="px-6 sm:px-10 lg:px-14 py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-sans font-medium text-[11px] tracking-[0.32em] uppercase text-champagne mb-3">
          — THE RECEIPTS
        </div>
        <h2 className="font-display italic font-normal text-[44px] sm:text-[52px] lg:text-[56px] leading-none tracking-[-0.02em] text-ivory mb-8 sm:mb-10">
          A few <em className="italic text-champagne">kind words</em>.
        </h2>
        <div>
          {ITEMS.map(item => (
            <TestimonialItem key={item.index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
