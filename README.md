#  🎬 Website Đặt Vé Xem Phim

> *React 18 / Node.js / Express / MySQL / Docker – sử dụng Sequelize ORM, Redux Toolkit, Tailwind CSS.*

---

## 🧩 1. Giới thiệu

Website đặt vé xem phim bao gồm hai phần:

* **Frontend**: React 18, Tailwind CSS, Redux Toolkit
* **Backend**: Node.js (Express), Sequelize, MySQL
* Cho phép:

  * Đăng ký/Đăng nhập, xem thông tin phim & lịch chiếu
  * Đặt vé xem phim (chọn ghế, thanh toán giả lập)
  * Quản lý tài khoản, lịch sử đặt vé
  * Admin: CRUD phim, rạp, suất chiếu, doanh thu

* Sau khi chạy hệ thống thành công, có thể đăng nhập bằng tài khoản admin:
  * 📧 Email: admin@gmail.com hoặc ☎️ Phone: 038038038
  * 🔑 Mật khẩu: admin123456789

---

## 🏗️ 2. Stack & Kiến trúc

| Tầng         | Công nghệ                             |
| ------------ | ------------------------------------- |
| **Frontend** | React 18, Redux Toolkit, Tailwind CSS |
| **Backend**  | Node 20, Express 4, Sequelize ORM     |
| **Database** | MySQL 8                               |
| **DevOps**   | Docker 24, Docker Compose v2          |

Toàn bộ hệ thống có thể chạy qua Docker Compose hoặc local (chia service).

---

## 💻 3. Yêu cầu hệ thống

* **Node.js** ≥ 20.x
* **MySQL** ≥ 8.x (nếu muốn chạy thuần local)
* **Docker** & **Docker Compose v2** (khuyên dùng)
* **Git**, **Terminal** hoặc PowerShell

---

## ⚙️ 4. Thiết lập môi trường

```bash
# Clone repository
$ git clone https://github.com/huuluan186/Movie-ticket-booking-system.git
$ cd Movie-ticket-booking-system

# Dùng Docker:
$ cp .env.example .env

# Dùng Local:
$ cp server/.env.example server/.env
$ cp client/.env.example client/.env
```

## 🐳 5. Chạy bằng Docker (fullstack)

```bash
docker compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)
* Swagger Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🧪 6. Chạy local từng service (dev mode)

### 🔧 Backend

```bash
cd server
cp .env.example .env
npm install
cd src
npx sequelize db:migrate
cd ..
npm run dev
```

### 🎨 Frontend

```bash
cd client
cp .env.example .env
npm install
npm start
```

---

## 🗂️ 7. Cấu trúc thư mục

```
.
├── client/                    # React app
│   ├── public/                # Favicon, index.html...
│   ├── src/                   # Source code chính
│   │   ├── assets/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── axios.config.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── redux.js
│   ├── .env.example
│   ├── Dockerfile             # Docker hoá frontend
│   ├── nginx.conf             # Config nginx cho production
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── server/                   # Express API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── migrations/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   ├── .env.example
│   ├── .sequelizerc.docker.js
│   ├── cron.js
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── wait-for.sh
│
├── .env.example              # Dùng cho Docker Compose
├── .gitignore
├── docker-compose.yaml       # Chạy toàn hệ thống
└── README.md

---

📦Repo gốc: [https://github.com/huuluan186/Movie-ticket-booking-system](https://github.com/huuluan186/Movie-ticket-booking-system)
