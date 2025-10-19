# 🎵 Music Playlist App — Full Stack Setup Guide

This project consists of three main services:

- **PostgreSQL** – Database
- **NestJS (Backend)** – API Server with Prisma ORM
- **Next.js (Frontend)** – Web UI

All services are orchestrated using **Docker Compose**.

---

## 🧱 Project Structure

```
music_app/
├── docker-compose.yml
├── music-playlist-api/              # NestJS + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   └── src/
│       └── main.ts
└── music-playlist/             # Next.js app
    ├── package.json
    └── next.config.js
```

---

## 🐳 Docker Compose Configuration

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:16
    restart: always
    container_name: music-postgres
    environment:
      POSTGRES_USER: musicplaylistadmin
      POSTGRES_PASSWORD: 4HcK94qXyZOilMWV
      POSTGRES_DB: music_playlist
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./music-playlist-api # ✅ fixed folder name
    container_name: music-backend
    ports:
      - "3030:3000"
    environment:
      DATABASE_URL: postgresql://musicplaylistadmin:4HcK94qXyZOilMWV@postgres:5432/music_playlist?schema=public
      PORT: 3000
    depends_on:
      - postgres

  frontend:
    build:
      context: ./music-playlist # ✅ fixed folder name
    container_name: music-frontend
    ports:
      - "8080:3000"
    environment:
      BACKEND_URL: http://localhost:3030
      NEXT_PUBLIC_BACKEND_URL: http://localhost:3030
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 🚀 Getting Started

### 1️⃣ Start Docker Containers

Run this command from the project root:

```bash
docker-compose up -d
```

> 🟢 This will start PostgreSQL, Backend (NestJS), and Frontend (Next.js).

---

### 2️⃣ Run Prisma Migrations

Once the backend container is running, run the following inside it:

```bash
docker exec -it music-backend npx prisma migrate dev
```

> This applies your Prisma schema to the PostgreSQL database and creates the necessary tables.

---

### 3️⃣ Run the Database Seed

To populate initial data (like default users or music):

```bash
docker exec -it music-backend npx prisma db seed
```

> Your seed script should be defined in **`backend/prisma/seed.ts`**, and Prisma should be configured in `package.json` like so:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Make sure you’ve installed `ts-node` as a dev dependency:

```bash
npm install -D ts-node
```

---

### 4️⃣ Access the Apps

- **Backend (NestJS)** → [http://localhost:3030](http://localhost:3030)
- **Frontend (Next.js)** → [http://localhost:8080](http://localhost:8080)
- **Database (Postgres)** → `localhost:5432`

---

### 5️⃣ (Optional) View Prisma Studio

To inspect data visually:

```bash
docker exec -it music-backend npx prisma studio
```

Then open: [http://localhost:5555](http://localhost:5555)

---

## ✅ Common Commands

| Action                   | Command                                                |
| ------------------------ | ------------------------------------------------------ |
| Start all containers     | `docker-compose up -d`                                 |
| Stop all containers      | `docker-compose down`                                  |
| View logs                | `docker-compose logs -f backend`                       |
| Apply new schema changes | `docker exec -it music-backend npx prisma migrate dev` |
| Rerun seed data          | `docker exec -it music-backend npx prisma db seed`     |

---
