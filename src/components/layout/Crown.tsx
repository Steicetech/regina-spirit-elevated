/** Coroa della marca: da sostituire con il file ufficiale quando arriverà. */
export function Crown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 36.5h36M8 36.5V24L16 30l8-18 8 18 8-6v12.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M10 36.5h28" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <circle cx="24" cy="10.5" r="2.4" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="8.5" cy="23" r="1.4" fill="currentColor" />
      <circle cx="39.5" cy="23" r="1.4" fill="currentColor" />
      <circle cx="16" cy="29.5" r="1.15" fill="currentColor" />
      <circle cx="32" cy="29.5" r="1.15" fill="currentColor" />
    </svg>
  );
}
