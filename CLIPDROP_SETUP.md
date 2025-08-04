# Настройка Clipdrop API

## Замена Midjourney на Clipdrop

Проект был обновлен для использования Clipdrop API вместо Midjourney через Discord.

## Переменные окружения

Создайте файл `.env` в корневой папке проекта со следующими переменными:

```env
# Clipdrop API
CLIPDROP_API_KEY=your_clipdrop_api_key_here

# OpenAI API (для генерации описаний)
OPENAI_API_KEY=your_openai_api_key_here
```

## Получение API ключа Clipdrop

1. Перейдите на [Clipdrop API](https://clipdrop.co/apis/docs/text-to-image)
2. Зарегистрируйтесь или войдите в аккаунт
3. Получите API ключ в разделе "Authentication"
4. Добавьте ключ в переменную `CLIPDROP_API_KEY`

## Особенности Clipdrop API

- **Формат изображений**: PNG, 1024x1024 пикселей
- **Лимиты**: 60 запросов в минуту по умолчанию
- **Кредиты**: 1 запрос = 1 кредит
- **Бесплатные кредиты**: 100 кредитов для разработки

## API Endpoints

### Бэкенд
- `POST /clipdrop/generate-image` - генерация изображения
- `POST /clipdrop/generate-image-with-description` - генерация изображения с описанием

### Фронтенд
- `clipdropApi.generateImage()` - генерация изображения
- `clipdropApi.generateImageWithDescription()` - генерация изображения с описанием

### Интерфейс
- Кнопка "Сгенерировать изображение" - только изображение
- Кнопка "Сгенерировать с описанием" - изображение + заголовок + описание

## Установка зависимостей

```bash
npm install form-data axios
```

## Запуск

1. Установите зависимости: `npm install`
2. Настройте переменные окружения
3. Запустите бэкенд: `npm run dev` (порт 5000)
4. Запустите фронтенд: `cd client && npm run dev` (порт 5173)

## Переменные окружения для фронтенда (опционально)

Создайте файл `client/.env`:

```env
VITE_BASE_URL=http://localhost:5000/api/v1
VITE_SERVER_KEY=your_server_key_here
```

Если файл не создан, будет использован URL по умолчанию: `http://localhost:5000/api/v1` 