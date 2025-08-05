import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes";
import healthcheckRouter from "./routes/healthcheck";
import path from "path";
import errorMiddelware from "./middelewares/errorMiddelware";

const app = express();
const dirname = path.resolve();

// Безопасность
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.disable("x-powered-by");

// Ограничение частоты запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  limit: 500, // лимит 500 запросов с одного IP
});
app.use(limiter);

// Сжатие ответов
app.use(compression());

// Логирование запросов
app.use(morgan("dev"));

// CORS настройки
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
    ];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key", "Accept"],
    credentials: true,
  })
);
app.use(express.json());

// Mount API routes
app.use("/api/v1", routes);
app.use("/api/v1/healthcheck", healthcheckRouter);

// Serve static files from client/dist
app.use(express.static(path.join(dirname, "client", "dist")));

// Serve index.html for all non-API routes (SPA routing)
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(dirname, "client", "dist", "index.html"));
});

app.use(errorMiddelware);

export default app;
