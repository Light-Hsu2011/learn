import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: Request) {
  const { message, lessonTitle, lessonContent } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  const systemPrompt = `你是一位學習助教，負責回答學生在閱讀課程時的問題。

目前學生正在閱讀的課程：「${lessonTitle || "未知課程"}」

課程內容摘要：
${lessonContent ? lessonContent.slice(0, 6000) : "（無法取得課程內容）"}

回答規則：
- 用繁體中文回答
- 先用簡單的比喻或例子解釋，再給技術細節
- 如果問題超出課程範圍，簡短回答後建議學生去哪裡深入學習
- 回答保持精簡，每次回答不超過 300 字
- 如果學生問的是面試題，給出結構化的參考答案`;

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: message }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
