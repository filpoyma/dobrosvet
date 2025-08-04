# ✅ Чек-лист развертывания на Render.com

## 📋 Подготовка к развертыванию

### 1. Репозиторий
- [ ] Код закоммичен в Git
- [ ] Репозиторий подключен к Render.com
- [ ] Все файлы добавлены в репозиторий

### 2. Переменные окружения
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URL` (MongoDB Atlas или локальный)
- [ ] `OPENAI_API_KEY`
- [ ] `DISCORD_TOKEN` (если используется Discord)
- [ ] `DISCORD_CHANNEL_ID` (если используется Discord)
- [ ] `DISCORD_AUTHOR_ID` (если используется Discord)
- [ ] `WEBHOOK_URL` (если используется Discord)
- [ ] `PINTEREST_ACCESS_TOKEN` (если используется Pinterest)
- [ ] `PINTEREST_BOARD_ID` (если используется Pinterest)
- [ ] `ALLOWED_ORIGINS` (для CORS)

### 3. Настройки Render.com
- [ ] Создан новый Web Service
- [ ] Build Command: `npm install && npm run build:all`
- [ ] Start Command: `npm start`
- [ ] Health Check Path: `/api/v1/healthcheck`
- [ ] Environment: Node.js
- [ ] Plan: Free (или платный)

## 🚀 Процесс развертывания

### 1. Первое развертывание
```bash
# Render автоматически выполнит:
npm install
npm run build:all
npm start
```

### 2. Проверка работоспособности
- [ ] Health check: `https://your-app.onrender.com/api/v1/healthcheck`
- [ ] API работает: `https://your-app.onrender.com/api/v1/discord/latest`
- [ ] Frontend загружается: `https://your-app.onrender.com`

### 3. Тестирование функций
- [ ] Генерация описаний работает
- [ ] Discord webhook работает (если настроен)
- [ ] Pinterest публикация работает (если настроен)
- [ ] MongoDB подключение работает

## 🔧 Автоматическое развертывание

### Использование render.yaml
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

### Логи
- [ ] Просматривайте логи в Render Dashboard
- [ ] Проверьте ошибки в консоли
- [ ] Мониторьте использование ресурсов

### Метрики
- [ ] Response time
- [ ] Error rate
- [ ] Memory usage
- [ ] CPU usage

## 🐛 Отладка

### Частые проблемы:
1. **Build fails**: Проверьте зависимости и TypeScript ошибки
2. **Runtime errors**: Проверьте переменные окружения
3. **MongoDB connection**: Проверьте URL и сетевые настройки
4. **CORS errors**: Настройте ALLOWED_ORIGINS
5. **Discord bot**: Проверьте токены и права доступа

### Команды для отладки:
```bash
# Локальная проверка
npm run build
npm start

# Проверка переменных окружения
echo $MONGODB_URL
echo $OPENAI_API_KEY
```

## 🔒 Безопасность

- [ ] Все секреты в переменных окружения
- [ ] Нет .env файлов в репозитории
- [ ] HTTPS включен
- [ ] CORS настроен правильно
- [ ] Rate limiting работает

## 📈 Оптимизация

- [ ] Используйте платный план для лучшей производительности
- [ ] Настройте автомасштабирование
- [ ] Используйте CDN для статических файлов
- [ ] Оптимизируйте запросы к базе данных
- [ ] Настройте кэширование

## ✅ Готово!

После выполнения всех пунктов ваш сервер будет готов к работе на Render.com! 