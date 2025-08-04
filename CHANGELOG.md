# Changelog

## [2.0.0] - 2025-01-XX

### Изменено
- **Заменил Midjourney API на Clipdrop API**
  - Удален Discord интеграция для Midjourney
  - Добавлена прямая интеграция с Clipdrop API
  - Изменены все API endpoints с `/midjourney` на `/clipdrop`

### Добавлено
- Новый сервис `clipdropService.ts` для работы с Clipdrop API
- Новый контроллер `clipdropController.ts`
- Новый роутер `clipdrop.router.ts`
- Новый API клиент `clipdropApi.ts` на фронтенде
- Документация по настройке в `CLIPDROP_SETUP.md`

### Удалено
- `discordMidjourneyService.ts` - сервис для работы с Discord Midjourney
- `midjourneyController.ts` - контроллер Midjourney
- `midjourney.router.ts` - роутер Midjourney
- `midjourneyApi.ts` - API клиент Midjourney на фронтенде

### Зависимости
- Добавлены: `form-data`, `axios`, `@types/compression`
- Удалены: `node-fetch`, `@types/node-fetch` (заменены на axios)

### Переменные окружения
- Заменена `DISCORD_TOKEN` и `DISCORD_CHANNEL_ID` на `CLIPDROP_API_KEY`

### Особенности Clipdrop API
- Формат изображений: PNG, 1024x1024 пикселей
- Лимиты: 60 запросов в минуту
- Кредиты: 1 запрос = 1 кредит
- 100 бесплатных кредитов для разработки

## [2.1.0] - 2025-01-XX

### Добавлено
- Кнопка "Сгенерировать с описанием" на фронтенде
- Отображение заголовка и описания для изображений
- Улучшенные стили для группы кнопок и описаний

### Исправлено
- CORS ошибки при вызове API
- Настройка правильного URL для API по умолчанию
- Улучшена конфигурация CORS на бэкенде

### Изменено
- Заменен node-fetch на axios в clipdropService
- Удалены зависимости node-fetch и @types/node-fetch 