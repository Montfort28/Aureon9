import React from 'react';

export function Button({ variant = 'default', className, children, disabled, asChild = false, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-colors px-4 py-2 text-sm';
  
  const variants = {
    default: 'bg-[#0A2540] text-white hover:bg-[#14385f] disabled:bg-slate-400',
    outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'hover:bg-slate-100 text-slate-900',
  };

  const buttonClassName = `${baseStyles} ${variants[variant]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${buttonClassName} ${children.props.className || ''}`.trim(),
      ...props,
    });
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
