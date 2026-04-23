export function Progress({ value, className = '' }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div
        className="h-full bg-[#0A2540] transition-all"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
