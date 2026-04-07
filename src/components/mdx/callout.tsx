interface CalloutProps {
  type?: "tip" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  tip: {
    border: "border-green-300 dark:border-green-700",
    bg: "bg-green-50 dark:bg-green-950/30",
    icon: "💡",
    defaultTitle: "提示",
  },
  warning: {
    border: "border-orange-300 dark:border-orange-700",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    icon: "⚠️",
    defaultTitle: "注意",
  },
  info: {
    border: "border-blue-300 dark:border-blue-700",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: "ℹ️",
    defaultTitle: "補充",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];

  return (
    <div className={`my-6 rounded-lg border-l-4 ${s.border} ${s.bg} p-4`}>
      <p className="font-semibold mb-1 flex items-center gap-2">
        <span>{s.icon}</span>
        {title ?? s.defaultTitle}
      </p>
      <div className="text-sm">{children}</div>
    </div>
  );
}
