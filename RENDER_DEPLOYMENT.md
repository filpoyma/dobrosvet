# Развертывание на Render.com

## 🚀 Быстрый старт

1. **Подключите репозиторий** к Render.com
2. **Создайте новый Web Service**
3. **Настройте переменные окружения**
4. **Запустите развертывание**

## 📋 Настройка переменных окружения

В Render.com Dashboard добавьте следующие переменные:

### Обязательные переменные:
```env
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dobrosvet
OPENAI_API_KEY=your_openai_api_key
```

### Discord (опционально):
```env
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_channel_id
DISCORD_AUTHOR_ID=your_author_id
WEBHOOK_URL=https://your-app.onrender.com/api/v1/discord/webhook
```

### Pinterest (опционально):
```env
PINTEREST_ACCESS_TOKEN=your_pinterest_token
PINTEREST_BOARD_ID=your_board_id
```

### CORS (для фронтенда):
```env
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://your-app.onrender.com
```

## ⚙️ Настройки развертывания

### Build Command:
```bash
npm install && npm run build:all
```

### Start Command:
```bash
npm start
```

### Health Check Path:
```
/api/v1/healthcheck
```

## 🔧 Автоматическое развертывание

Используйте `render.yaml` для автоматической настройки:

```yaml
services:
  - type: web
    name: dobrosvet-api
    env: node
    plan: free
    buildCommand: npm install && npm run build:all
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /api/v1/healthcheck
    autoDeploy: true
```

## 📊 Мониторинг

- **Health Check**: `https://your-app.onrender.com/api/v1/healthcheck`
- **API Base URL**: `https://your-app.onrender.com/api/v1`
- **Frontend**: `https://your-app.onrender.com`

## 🔒 Безопасность

- Все переменные окружения должны быть установлены в Render Dashboard
- Не коммитьте `.env` файлы в репозиторий
- Используйте HTTPS в продакшене
- Настройте CORS для ваших доменов

## 🐛 Отладка

### Логи:
- Просматривайте логи в Render Dashboard
- Используйте `console.log()` для отладки

### Частые проблемы:
1. **MongoDB подключение**: Проверьте `MONGODB_URL`
2. **CORS ошибки**: Настройте `ALLOWED_ORIGINS`
3. **Discord бот**: Проверьте токены и права доступа
4. **OpenAI API**: Проверьте лимиты и ключи

## 📈 Масштабирование

Для увеличения производительности:
- Перейдите на платный план
- Настройте автомасштабирование
- Используйте CDN для статических файлов
- Оптимизируйте запросы к базе данных 