const labels: Record<number, { text: string; className: string }> = {
  5: { text: "必考", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  4: { text: "高頻", className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  3: { text: "常考", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
  2: { text: "偶爾考", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  1: { text: "了解即可", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

export function InterviewBadge({ importance }: { importance: number }) {
  const level = Math.min(5, Math.max(1, importance));
  const { text, className } = labels[level];
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${className}`}>
      {text}
    </span>
  );
}

export function InterviewStars({ importance }: { importance: number }) {
  const level = Math.min(5, Math.max(1, importance));
  return (
    <span className="text-xs text-yellow-500" title={`面試重要度 ${level}/5`}>
      {"★".repeat(level)}{"☆".repeat(5 - level)}
    </span>
  );
}
