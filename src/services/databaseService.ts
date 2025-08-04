import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URL!);
    console.log("Подключение к MongoDB установлено");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error);
    process.exit(1);
  }
}

mongoose.connection.on("error", (error) => {
  console.error("Ошибка MongoDB:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB отключен");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB переподключен");
});
