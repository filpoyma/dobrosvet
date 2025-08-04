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
  console.log(`🚀 Server is running on port ${PORT} in ${NODE_ENV} mode`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/v1/healthcheck`);
});

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received, shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });
//
// process.on('SIGINT', () => {
//   console.log('SIGINT received, shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });
