# Dobrosvet - Image Generation Service

Проект для генерации изображений с использованием Midjourney через Discord, OpenAI и публикации в Pinterest.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
# Установка зависимостей сервера
npm install

# Установка зависимостей клиента
cd client
npm install
cd ..
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корневой папке проекта:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Discord Configuration
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CHANNEL_ID=your_discord_channel_id_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Pinterest Configuration
PINTEREST_ACCESS_TOKEN=your_pinterest_access_token_here
PINTEREST_BOARD_ID=your_pinterest_board_id_here
```

Создайте файл `client/.env`:

```env
VITE_BASE_URL=http://localhost:5000
VITE_SERVER_KEY=your_server_key_here
```

### 3. Сборка и запуск

```bash
# Сборка клиента
cd client && npm run build && cd ..

# Запуск сервера
npm run dev
```

Откройте браузер и перейдите на http://localhost:5000

## 🏗️ Архитектура

```
dobrosvet/
├── client/          # React + Vite (фронтенд)
│   ├── src/
│   │   ├── api/     # API клиенты
│   │   └── App.tsx  # Главный компонент
│   └── dist/        # Собранные файлы
└── src/             # Node.js + Express (бэкенд)
    ├── controllers/ # API контроллеры
    ├── services/    # Бизнес-логика
    └── routes/      # API маршруты
```

## 📡 API Endpoints

- `POST /api/v1/midjourney/generate-image` - Генерация изображения
- `POST /api/v1/midjourney/generate-image-with-description` - Изображение + описание
- `POST /api/v1/openai/title-description` - Создание заголовка и описания
- `POST /api/v1/pinterest/pin` - Публикация в Pinterest
- `GET /healthcheck` - Проверка здоровья сервера

## 🎨 Функциональность

### Генерация изображений
- Ввод промпта на русском языке
- Интеграция с Midjourney через Discord
- Отображение результата с загрузкой

### UI/UX
- Современный дизайн с темной темой
- Адаптивный интерфейс
- Индикаторы загрузки
- Обработка ошибок

## 🔧 Технологии

### Backend
- Node.js + Express
- TypeScript
- Discord.js
- OpenAI API
- Pinterest API
- Axios

### Frontend
- React 19
- TypeScript
- Vite
- Ky (HTTP клиент)

## 📝 Скрипты

```bash
# Сервер
npm run dev              # Запуск в режиме разработки
npm run build            # Сборка TypeScript
npm run start            # Запуск продакшн версии
npm run build:client     # Сборка клиента
npm run build:all        # Сборка всего проекта
npm run dev:full         # Сборка клиента + запуск сервера

# Клиент
cd client
npm run dev              # Запуск в режиме разработки
npm run build            # Сборка проекта
npm run preview          # Предварительный просмотр
```

## ⚠️ Важные замечания

1. **Discord Bot** требует настройки в Developer Portal
2. **MessageContent Intent** должен быть включен для чтения сообщений
3. **Midjourney** должен быть активен в указанном канале
4. **API ключи** должны быть действительными

## 🐛 Отладка

Если возникают проблемы:

1. Проверьте переменные окружения
2. Убедитесь, что Discord бот подключен к серверу
3. Проверьте логи сервера в консоли
4. Убедитесь, что клиент собран (`npm run build:client`) 