export function ShieldLogo({ size = 26 }: { size?: number }) {
  const height = Math.round(size * (30 / 26));
  return (
    <svg width={size} height={height} viewBox="0 0 26 30" fill="none" aria-hidden="true">
      <path
        d="M13 0L25 5V14C25 21.5 20 27 13 30C6 27 1 21.5 1 14V5L13 0Z"
        stroke="#f4f6f8"
        strokeWidth="1.2"
      />
      <path
        d="M13 5L20 8V14.5C20 19 17 22.5 13 24.5C9 22.5 6 19 6 14.5V8L13 5Z"
        stroke="#f4f6f8"
        strokeWidth="0.8"
      />
    </svg>
  );
}
