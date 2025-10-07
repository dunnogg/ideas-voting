````markdown
# 🗳️ Ideas Voting

Проект с frontend и backend. Запуск через Docker Compose.

## ⚙️ Настройка окружения

Перед запуском проекта нужно создать `.env` файл **в папке `backend/`** и указать в нём переменные
окружения, по примеру из файла `.env.example`.

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://myuser:mypassword@postgres:5432/ideasdb
PORT=3000
```
````

## Запуск

```bash
docker compose up --build
```

## Остановка

```bash
docker compose down
```

```

```
