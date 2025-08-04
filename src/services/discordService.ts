import {
  Client,
  GatewayIntentBits,
  TextChannel,
  Message,
  Attachment,
} from "discord.js";
import axios from "axios";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID as string;
const WEBHOOK_URL = process.env.WEBHOOK_URL as string; // URL вашего сервера
const DISCORD_AUTHOR_ID = process.env.DISCORD_AUTHOR_ID;

if (!DISCORD_TOKEN || !DISCORD_CHANNEL_ID) {
  throw new Error(
    "DISCORD_TOKEN и DISCORD_CHANNEL_ID должны быть заданы в .env"
  );
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export interface MidjourneyMessage {
  prompt: string;
  imageUrl: string;
  messageId: string;
  channelId: string;
  timestamp: Date;
}

// Функция для отправки данных на ваш сервер
async function sendToServer(data: MidjourneyMessage) {
  try {
    const response = await axios.post(WEBHOOK_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Данные успешно отправлены на сервер");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Ошибка отправки на сервер:",
        error.response?.status,
        error.response?.statusText
      );
    } else {
      console.error("Ошибка отправки на сервер:", error);
    }
  }
}

// Обработчик сообщений
client.on("messageCreate", async (message: Message) => {
  if (message.channelId !== DISCORD_CHANNEL_ID) return;

  // Проверяем, что сообщение от Midjourney бота
  if (message.author.id !== DISCORD_AUTHOR_ID) return; // ID Midjourney бота

  console.log("Получено сообщение от Midjourney:", message.content);

  // Ищем промпт в сообщении
  const promptMatch = message.content.match(/^(.+?)(?:\s*--\s*|$)/);
  if (!promptMatch) {
    console.log("Промпт не найден в сообщении");
    return;
  }

  let prompt = promptMatch[1].trim();
  
  // Извлекаем текст между двойными звездочками **
  const starMatch = prompt.match(/\*\*(.*?)\*\*/);
  if (starMatch) {
    prompt = starMatch[1].trim();
  } else {
    // Если нет двойных звездочек, очищаем от лишних звездочек в начале и конце
    prompt = prompt.replace(/^\*\*+/, '').replace(/\*\*+$/, '').trim();
  }

  // Ищем изображения в сообщении
  const attachments = message.attachments.filter((att) =>
    att.contentType?.startsWith("image/")
  );

  if (attachments.size === 0) {
    console.log("Изображения не найдены в сообщении");
    return;
  }

  // Отправляем данные на ваш сервер
  const midjourneyData: MidjourneyMessage = {
    prompt,
    imageUrl: attachments.first()!.url,
    messageId: message.id,
    channelId: message.channelId,
    timestamp: message.createdAt,
  };

  await sendToServer(midjourneyData);
  console.log("Отправлено на сервер:", midjourneyData);
});

// Подключение к Discord
export async function startDiscordBot() {
  try {
    await client.login(DISCORD_TOKEN);
    console.log("Discord бот подключен!");
  } catch (error) {
    console.error("Ошибка подключения Discord бота:", error);
  }
}

export { client };
