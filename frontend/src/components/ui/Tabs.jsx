export function Tabs({ children, defaultValue, className, ...props }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, className, ...props }) {
  return (
    <div
      className={`inline-flex rounded-2xl bg-slate-100 p-1 ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, ...props }) {
  return (
    <button
      role="tab"
      className={`rounded-2xl px-3 py-2 text-sm font-medium transition-colors ${
        activeTab === value
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-600 hover:text-slate-900'
      }`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, activeTab, ...props }) {
  if (activeTab !== value) return null;
  return <div {...props}>{children}</div>;
}

import React from 'react';
