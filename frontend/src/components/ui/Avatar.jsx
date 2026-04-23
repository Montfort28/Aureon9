export function Avatar({ className, children, ...props }) {
  return (
    <div
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarFallback({ children, ...props }) {
  return <>{children}</>;
}
