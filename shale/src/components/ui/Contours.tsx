export function Contours({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`contours ${className}`}
      viewBox="0 0 700 800"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${180 - i * 26} ${-100 + i * 6}C${730 - i * 19} ${-100 + i * 22} ${185 + i * 18} ${280 + i * 11} ${530 + i * 14} ${390 + i * 20}S${950 - i * 7} ${700 + i * 25} ${210 - i * 26} ${890 + i * 10}`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
