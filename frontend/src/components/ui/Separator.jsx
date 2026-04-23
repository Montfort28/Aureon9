export function Separator({ className = '', ...props }) {
  return <div className={`border-t border-slate-200 ${className}`} {...props} />;
}
