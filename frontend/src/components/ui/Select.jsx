export function Select({ value, onChange, children, ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-[#0A2540] focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ className, children, ...props }) {
  return (
    <button
      className={`rounded-2xl border border-slate-200 bg-white px-4 py-2 text-left text-sm text-slate-900 hover:bg-slate-50 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, value }) {
  return <span>{value || placeholder}</span>;
}

export function SelectContent({ children, ...props }) {
  return (
    <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-2xl border border-slate-200 bg-white shadow-lg">
      {children}
    </div>
  );
}

export function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}
