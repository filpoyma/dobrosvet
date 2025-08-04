import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY должен быть задан в .env");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function generateTitleAndDescription(
  prompt: string,
  imageUrl: string
): Promise<{ title: string; description: string }> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    temperature: 0.8,
    max_completion_tokens: 200,
  });

  const content = response.choices[0].message?.content || "";
  // Ожидаем формат: "Заголовок: ...\nОписание: ..."
  console.log("file-openaiService.ts content:", content);
  const [titleLine, ...descLines] = content.split("\n");
  const title = titleLine
    .replace(/Заголовок:\s*/i, "")
    .replace(/Заглавие:\s*/i, "")
    .replace(/\*\*+/g, "")
    .trim();
  console.log("file-openaiService.ts title:", title);
  const description = descLines
    .join(" ")
    .replace(/Описание:\s*/i, "")
    .replace(/\*\*+/g, "")
    .trim();
  return { title, description };
}
