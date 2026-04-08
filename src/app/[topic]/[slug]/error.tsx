"use client";

export default function LessonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-center">
      <h2 className="text-2xl font-bold mb-4">課程載入失敗</h2>
      <p className="text-gray-500 mb-6">
        這篇課程的內容可能有格式錯誤，請回報此問題。
      </p>
      <p className="text-sm text-red-400 mb-6 font-mono">{error.message}</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          重試
        </button>
        <a
          href="/"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          回首頁
        </a>
      </div>
    </div>
  );
}
