import app from "./app";
import { startDiscordBot } from "./services/discordService";
import { connectToDatabase } from "./services/databaseService";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Подключаемся к MongoDB
connectToDatabase();

// Запускаем Discord бота
startDiscordBot();

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server is running on port http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
