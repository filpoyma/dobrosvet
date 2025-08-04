import app from "./app";
import { startDiscordBot } from './services/discordService';
import { connectToDatabase } from './services/databaseService';

const PORT = process.env.PORT || 5000;

// Подключаемся к MongoDB
connectToDatabase();

// Запускаем Discord бота
startDiscordBot();

app.listen(PORT, () => {
  console.log("Server is running %s", `http://localhost:${PORT}`);
});
