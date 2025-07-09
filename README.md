# 🔗 Full Stack URL Shortener with Analytics & Logging

A robust, fully-functional full-stack **URL Shortener** microservice that provides real-time link shortening, redirection, analytics, and integrated centralized logging — all built using **MERN Stack** and **Material UI**.

---

## 🚀 Features

- 🔗 URL Shortening with optional **custom shortcodes**
- ⏳ URL expiry (defaults to 30 mins if not provided)
- 🔒 No authentication needed (assumes pre-authorized usage)
- 🌐 URL Redirection handler (e.g., `localhost:5000/abcd1`)
- 🧾 Logging middleware integrated with external test server API
- 🧑‍💻 Modular & scalable backend architecture (MVC pattern)
- 💅 Frontend built with React + Vite + Material UI
- 🔄 Concurrent URL shortening support (up to 5 at once)

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React, Vite, Material UI |
| Backend    | Node.js, Express.js, MongoDB |
| Database   | MongoDB Atlas or local MongoDB |
| Logging    | Custom Middleware, Axios |
| Styling    | Material UI |
| Deployment | Render/Vercel (optional) |

---

## 🔧 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/krishnatejaswi2005/22J41A67E9.git
cd u22J41A67E9
````

---

### 2️⃣ Setup Backend

```bash
cd Backend
npm install
```

#### Create `.env` file:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
HOST=http://localhost:5000
```

#### Start the Backend Server

```bash
npm start
# or
nodemon server.js
```

---

### 3️⃣ Setup Frontend

```bash
cd ../Frontend
npm install
```

#### Start the React App

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

### 🔗 URL Shortening Flow

1. User submits a long URL + optional shortcode + optional validity
2. Backend validates input, generates unique shortcode (if not provided)
3. Saves to MongoDB with expiry timestamp
4. Responds with shortened URL
5. Logs the creation event using shared logging middleware

### 🌐 Redirection

* Accessing `http://localhost:5000/<shortcode>`:

  * Looks up in DB
  * If valid and not expired:

    * Logs the access (click time, referrer, geo-location)
    * Redirects to original long URL
  * Else returns 404 / expired response

### 📊 Analytics

* Fetch stats via `GET /shorturls/:shortcode`
* Returns:

  * Original URL
  * Total clicks
  * Creation & expiry dates
  * Click details: timestamps, referrer, location

---

## 📡 Logging Middleware

### Endpoint

All logs are POSTed to:

```
http://20.244.56.144/eva1uation-service/logs
```

### Fields

| Field   | Allowed Values                                        |
| ------- | ----------------------------------------------------- |
| stack   | `backend`, `frontend`                                 |
| level   | `debug`, `info`, `warn`, `error`, `fatal`             |
| package | `handler`, `controller`, `service`, `component`, etc. |
| message | Descriptive string                                    |

### Example

```js
log("backend", "error", "handler", "Shortcode collision detected");
```

---

## 🖥️ Screenshots

| URL Shortener Form                        | Statistics Page                   |
| ----------------------------------------- | --------------------------------- |
| ![Shortener](./screenshots/shortener.png) | ![Stats](./screenshots/stats.png) |

---

## ✅ Validation

* ✅ URLs are validated before submission
* ✅ Shortcodes must be alphanumeric, 4–15 chars
* ✅ Validity must be an integer > 0
* ✅ Expired links return appropriate HTTP errors

---

## 🐛 Error Handling

* All API endpoints return meaningful error messages
* Logging middleware captures both success and failure cases
* Frontend alerts user for invalid inputs

---

## 📂 Sample API

### Create Short URL

```http
POST /shorturls
Content-Type: application/json

{
  "url": "https://www.example.com/page",
  "validity": 45,
  "shortcode": "abcde"
}
```

**Response:**

```json
{
  "shortLink": "http://localhost:5000/abcde",
  "expiry": "2025-07-09T13:45:00.000Z"
}
```

---

### Get Stats

```http
GET /shorturls/abcde
```

**Response:**

```json
{
  "shortcode": "abcde",
  "originalUrl": "https://www.example.com/page",
  "totalClicks": 2,
  "createdAt": "2025-07-09T13:00:00.000Z",
  "expiry": "2025-07-09T13:45:00.000Z",
  "clickDetails": [
    {
      "timestamp": "2025-07-09T13:10:00.000Z",
      "referrer": "https://google.com",
      "location": "Hyderabad"
    }
  ]
}
```

---

## 💬 Future Improvements

* 🔐 Add user authentication for personalized analytics
* 📊 Visualize stats using charts (e.g., Chart.js)
* 🌍 Improve geo-tracking with external APIs
* 🚀 Deploy on Vercel + MongoDB Atlas

---

## 👨‍💻 Developed By

**Krishna Tejaswi**
Full Stack Developer | MERN | Data Science | Community Mentor

---
