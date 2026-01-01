# 🔗 URL Shortener

A **production-oriented URL Shortener** built using **Node.js, Express, MySQL, and React**, designed with scalability, performance, and clean architecture in mind.

The application supports **URL shortening, fast redirection, and analytics**, with optional **Redis-based caching** to handle high-traffic scenarios efficiently.

This project demonstrates real-world **backend engineering concepts** such as REST API design, database modeling, caching strategies, and frontend–backend integration.

---

## ✨ Key Features

* 🔗 Convert long URLs into short, shareable links
* 🚀 Fast redirection with optional Redis caching
* 📊 Track click analytics for each short URL
* 🕒 Store URL creation timestamps
* 🧠 Graceful fallback when Redis is unavailable
* 🌱 Environment-based configuration using `.env`
* 🧩 Clean modular backend architecture
* ⚡ Modern React + Vite frontend

---

## 🧠 System Design Highlights

* **MySQL** ensures durable persistence of URLs and analytics data
* **Redis (optional)** caches frequently accessed URLs to reduce database load
* **RESTful API architecture** with clear separation of concerns
* **Scalable short-key generation** suitable for large datasets
* **Fail-safe caching layer** — application works even without Redis

---

## 🛠️ Tech Stack

### Backend

* Node.js (v16+)
* Express.js
* MySQL
* Redis (optional)
* dotenv

### Frontend

* React
* Vite
* Modern CSS

---

## 📋 Prerequisites

* Node.js v16 or higher
* MySQL Server
* Redis Server (optional)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd url-shortener
```

---

### 2️⃣ Install Dependencies

**Backend**

```bash
npm install
```

**Frontend**

```bash
cd client
npm install
cd ..
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory using `.env.example`:

```env
PORT=5000
BASE_URL=http://localhost:5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=url_shortener

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

> ⚠️ **Note:** The `.env` file is ignored by Git for security reasons.

---

### 4️⃣ Database Migration

Ensure the `urls` table includes analytics fields:

```sql
ALTER TABLE urls
ADD COLUMN clicks INT DEFAULT 0,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

Or run the provided migration file:

```bash
migrations/001_add_clicks_created_at.sql
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Documentation

### 🔹 Shorten a URL

**POST** `/api/shorten`

**Request Body**

```json
{
  "longUrl": "https://example.com"
}
```

**Response**

```json
{
  "shortUrl": "http://localhost:5000/api/abc123"
}
```

---

### 🔹 Redirect to Original URL

**GET** `/api/:shortKey`

* Redirects to the original URL
* Automatically increments click count

---

### 🔹 Fetch URL Statistics

**GET** `/api/:shortKey/stats`

**Response**

```json
{
  "id": 1,
  "longUrl": "https://example.com",
  "shortKey": "abc123",
  "clicks": 15,
  "createdAt": "2025-01-01T10:30:00Z"
}
```

---

## ⚡ Redis Caching (Optional)

* Redis caches `shortKey → longUrl` mappings
* Significantly reduces MySQL reads for frequent redirects
* Application continues to function even if Redis is down

Redis integration is implemented in:

```
src/cache/redis.js
```

---

## 📁 Project Structure

```
url-shortener/
├── src/
│   ├── controllers/   # Request handling
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── db/            # Database connection
│   └── cache/         # Redis integration
├── client/            # React frontend
├── migrations/        # SQL migrations
├── .env.example
└── README.md
```

---

## 🚀 Possible Enhancements

* 🔐 Authentication and user-specific URLs
* ⏳ Expiring short URLs
* 🎯 Custom aliases
* 🧯 Rate limiting
* 📈 Analytics dashboard
* 🐳 Docker & CI/CD pipeline

---

## 📌 Why This Project Matters

This project reflects **real-world backend engineering practices**, including:

* API design
* Caching strategies
* Database schema evolution
* Scalable architecture decisions

Ideal for:

* **SDE / Backend Internships**
* **System Design Fundamentals**
* **Resume & Portfolio Projects**

---

## 📤 GitHub Submission

```bash
git add .
git commit -m "Build scalable URL shortener with MySQL and Redis caching"
git push origin main
```
