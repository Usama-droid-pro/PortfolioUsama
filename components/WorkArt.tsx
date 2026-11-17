// Simple line drawings for the project cards (no screenshots under NDA).
// Drawn on a 120×120 grid; stroke colour comes from the card tone.
const art = {
  // Identity verification: shield with a check.
  shield: (
    <>
      <path d="M60 14 98 28v30c0 24-16 40-38 48C38 98 22 82 22 58V28Z" />
      <path d="m42 60 13 13 25-27" />
    </>
  ),
  // Loyalty rewards: a star with points sparkling off it.
  star: (
    <>
      <path d="m60 18 12 25 27 4-20 19 5 27-24-13-24 13 5-27-20-19 27-4Z" />
      <path d="M100 14v12M94 20h12M18 88v10M13 93h10" />
    </>
  ),
  // Time tracking: clock face with ticks.
  clock: (
    <>
      <circle cx="60" cy="62" r="42" />
      <path d="M60 36v26l18 12M60 20v6M60 98v6M18 62h6M96 62h6" />
    </>
  ),
  // Fleet booking: truck with a calendar tick above it.
  truck: (
    <>
      <path d="M12 44h58v40H12zM70 58h22l16 14v12H70z" />
      <circle cx="32" cy="88" r="9" />
      <circle cx="88" cy="88" r="9" />
      <path d="M30 22h28v16H30zM30 28h28" />
    </>
  ),
};

export type ArtName = keyof typeof art;

export default function WorkArt({ name, className }: { name: ArtName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      {art[name]}
    </svg>
  );
}
