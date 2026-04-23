export function Table({ className, ...props }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-sm ${className}`} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={`border-b border-slate-200 bg-slate-50 ${className}`} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={className} {...props} />;
}

export function TableHead({ className, children, ...props }) {
  return (
    <th className={`px-4 py-3 text-left font-medium text-slate-700 ${className}`} {...props}>
      {children}
    </th>
  );
}

export function TableRow({ className, ...props }) {
  return <tr className={`border-b border-slate-200 hover:bg-slate-50 ${className}`} {...props} />;
}

export function TableCell({ className, ...props }) {
  return <td className={`px-4 py-3 text-slate-900 ${className}`} {...props} />;
}
