# MongoDB Setup Guide

## 📋 Обзор

Проект использует MongoDB для хранения данных от Discord webhook. Все сообщения от Midjourney бота сохраняются в коллекции `mjdata`.

## 🗄️ Структура данных

### Модель MJData

```typescript
interface IMJData {
  prompt: string;        // Промпт для генерации изображения
  imageUrl: string;      // URL сгенерированного изображения
  messageId: string;     // ID сообщения в Discord (уникальный)
  channelId: string;     // ID канала Discord
  timestamp: Date;       // Время создания сообщения
  createdAt: Date;       // Время создания записи в БД
  updatedAt: Date;       // Время последнего обновления
}
```

## 🔧 Настройка

### 1. Установка MongoDB

#### macOS (с Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Windows:
Скачайте и установите с [официального сайта](https://www.mongodb.com/try/download/community)

### 2. Настройка переменных окружения

Добавьте в файл `.env`:

```env
MONGODB_URL=mongodb://localhost:27017/dobrosvet
```

### 3. Альтернативные варианты подключения

#### MongoDB Atlas (облачная версия):
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dobrosvet
```

#### MongoDB с аутентификацией:
```env
MONGODB_URL=mongodb://username:password@localhost:27017/dobrosvet
```

## 🚀 API Endpoints

### POST /api/v1/discord/webhook
Сохраняет данные от Discord webhook в MongoDB.

**Request Body:**
```json
{
  "prompt": "a beautiful sunset",
  "imageUrl": "https://example.com/image.jpg",
  "messageId": "123456789",
  "channelId": "987654321",
  "timestamp": "2025-01-04T12:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Данные получены и сохранены",
  "data": {
    "id": "6890cde33b6cf3324db571e3",
    "prompt": "a beautiful sunset",
    "imageUrl": "https://example.com/image.jpg",
    "messageId": "123456789",
    "channelId": "987654321",
    "timestamp": "2025-01-04T12:00:00.000Z"
  }
}
```

### GET /api/v1/discord/data
Получает все записи из MongoDB с пагинацией.

**Query Parameters:**
- `page` (number, default: 1) - номер страницы
- `limit` (number, default: 10) - количество записей на странице
- `channelId` (string, optional) - фильтр по ID канала

**Example:**
```bash
curl "http://localhost:5000/api/v1/discord/data?page=1&limit=5&channelId=987654321"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "6890cde33b6cf3324db571e3",
      "prompt": "a beautiful sunset",
      "imageUrl": "https://example.com/image.jpg",
      "messageId": "123456789",
      "channelId": "987654321",
      "timestamp": "2025-01-04T12:00:00.000Z",
      "createdAt": "2025-08-04T15:12:35.932Z",
      "updatedAt": "2025-08-04T15:12:35.932Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

### GET /api/v1/discord/latest
Получает последнюю сохраненную запись из MongoDB.

**Query Parameters:**
- `channelId` (string, optional) - фильтр по ID канала

**Example:**
```bash
# Получить последнюю запись из всех каналов
curl "http://localhost:5000/api/v1/discord/latest"

# Получить последнюю запись из конкретного канала
curl "http://localhost:5000/api/v1/discord/latest?channelId=987654321"
```

**Response (успех):**
```json
{
  "success": true,
  "message": "Последняя запись получена",
  "data": {
    "_id": "6890cde33b6cf3324db571e3",
    "prompt": "a beautiful sunset",
    "imageUrl": "https://example.com/image.jpg",
    "messageId": "123456789",
    "channelId": "987654321",
    "timestamp": "2025-01-04T12:00:00.000Z",
    "createdAt": "2025-08-04T15:12:35.932Z",
    "updatedAt": "2025-08-04T15:12:35.932Z"
  }
}
```

**Response (записи не найдены):**
```json
{
  "success": false,
  "message": "Записи не найдены",
  "data": null
}
```

## 🔍 Индексы

Для оптимизации запросов созданы следующие индексы:

- `messageId` (unique) - для быстрого поиска по ID сообщения
- `channelId` - для фильтрации по каналу
- `timestamp` (descending) - для сортировки по времени

## 🛠️ Управление данными

### Подключение к MongoDB через mongo shell:
```bash
mongo
use dobrosvet
db.mjdata.find().pretty()
```

### Очистка данных:
```javascript
// Удалить все записи
db.mjdata.deleteMany({})

// Удалить записи старше 30 дней
db.mjdata.deleteMany({
  timestamp: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
})
```

## ⚠️ Обработка ошибок

### Дублирование messageId
Если попытаться сохранить сообщение с уже существующим `messageId`, API вернет ошибку 409:
```json
{
  "error": "Сообщение с таким messageId уже существует"
}
```

### Отсутствие обязательных полей
Если не передать обязательные поля, API вернет ошибку 400:
```json
{
  "error": "Отсутствуют обязательные поля: prompt, imageUrl, messageId, channelId, timestamp"
}
```

## 📊 Мониторинг

Логи подключения к MongoDB:
- ✅ "Подключение к MongoDB установлено"
- ❌ "Ошибка подключения к MongoDB"
- ⚠️ "MongoDB отключен"
- ✅ "MongoDB переподключен"

## 🔒 Безопасность

- Используйте аутентификацию в продакшене
- Настройте firewall для MongoDB
- Регулярно делайте бэкапы
- Используйте SSL/TLS для подключений 