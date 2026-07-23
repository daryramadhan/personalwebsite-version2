export default function AvailableDot() {
  return (
    <div className="relative flex size-4 items-center justify-center shrink-0 bg-[#F25C0C]/15 rounded-full">
      {/* Pulsing ring */}
      <span className="animate-ping absolute inline-flex size-2 rounded-full bg-[#F25C0C] opacity-75"></span>
      {/* Inner solid dot */}
      <span className="relative inline-flex rounded-full size-2 bg-[#F25C0C]"></span>
    </div>
  );
}
