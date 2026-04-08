import type { Difficulty } from "@/lib/content";

const config: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  medium: { label: "Medium", className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  hard: { label: "Hard", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty];
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${className}`}>
      {label}
    </span>
  );
}
