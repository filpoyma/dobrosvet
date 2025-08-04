# Настройка Discord интеграции

## Описание

Discord бот слушает сообщения от Midjourney бота в указанном канале и отправляет промпт и URL изображения на ваш сервер.

## Переменные окружения

Добавьте в файл `.env` следующие переменные:

```env
# Discord Configuration
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CHANNEL_ID=your_discord_channel_id_here
WEBHOOK_URL=http://localhost:5000/api/v1/discord/webhook
```

## Настройка Discord бота

### 1. Создание приложения
1. Перейдите на https://discord.com/developers/applications
2. Нажмите "New Application"
3. Введите название для вашего бота
4. Перейдите в раздел "Bot"

### 2. Настройка бота
1. Нажмите "Add Bot"
2. В разделе "Privileged Gateway Intents" включите:
   - **Message Content Intent** (обязательно!)
   - Server Members Intent (если нужно)
   - Presence Intent (если нужно)
3. Сохраните изменения

### 3. Получение токена
1. В разделе "Bot" нажмите "Reset Token"
2. Скопируйте токен и добавьте в `DISCORD_TOKEN`

### 4. Добавление бота на сервер
1. Перейдите в раздел "OAuth2" -> "URL Generator"
2. В "Scopes" выберите "bot"
3. В "Bot Permissions" выберите:
   - Read Messages/View Channels
   - Read Message History
4. Скопируйте сгенерированную ссылку
5. Откройте ссылку в браузере и добавьте бота на ваш сервер

### 5. Получение ID канала
1. В Discord включите режим разработчика (User Settings -> Advanced -> Developer Mode)
2. Правой кнопкой мыши нажмите на канал с Midjourney
3. Выберите "Copy ID"
4. Добавьте ID в `DISCORD_CHANNEL_ID`

## API Endpoints

### POST /api/v1/discord/webhook
Получает данные от Discord бота.

**Тело запроса:**
```json
{
  "prompt": "описание изображения",
  "imageUrl": "https://example.com/image.jpg",
  "messageId": "123456789",
  "channelId": "987654321",
  "timestamp": "2025-01-04T12:00:00.000Z"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Данные получены",
  "data": {
    "prompt": "описание изображения",
    "imageUrl": "https://example.com/image.jpg",
    "messageId": "123456789",
    "channelId": "987654321",
    "timestamp": "2025-01-04T12:00:00.000Z"
  }
}
```

## Как это работает

1. Вы отправляете промпт Midjourney боту в Discord
2. Midjourney генерирует изображение и отправляет его в канал
3. Ваш Discord бот обнаруживает сообщение от Midjourney
4. Бот извлекает промпт и URL изображения
5. Бот отправляет данные на ваш сервер через webhook
6. Ваш сервер обрабатывает данные (сохраняет, генерирует описание и т.д.)

## Отладка

### Проверка подключения бота
При запуске сервера вы должны увидеть:
```
Discord бот подключен!
Server is running http://localhost:5000
```

### Проверка получения сообщений
При получении сообщения от Midjourney вы увидите:
```
Получено сообщение от Midjourney: [содержимое сообщения]
Отправлено на сервер: [данные]
Данные успешно отправлены на сервер
```

### Логи на сервере
При получении webhook вы увидите:
```
Получены данные от Discord: [данные]
```

## Устранение проблем

### Бот не подключается
- Проверьте правильность `DISCORD_TOKEN`
- Убедитесь, что включен Message Content Intent

### Бот не реагирует на сообщения
- Проверьте правильность `DISCORD_CHANNEL_ID`
- Убедитесь, что бот добавлен на сервер с нужными правами
- Проверьте, что сообщения отправляются от Midjourney бота (ID: 936929561302675456)

### Webhook не работает
- Проверьте правильность `WEBHOOK_URL`
- Убедитесь, что сервер запущен и доступен
- Проверьте логи сервера на наличие ошибок
