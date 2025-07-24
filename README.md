# 🔐 SAMPAHIN API

API ini baru menyediakan fitur autentikasi dasar (Register, Login, Update Profile, Change Password, dan Delete Account) menggunakan Express.js, MySQL, dan JWT.

---

## 📁 Fitur (Currently)

- ✅ Register
- ✅ Login
- ✅ Update Account (name, birthdate, phone)
- ✅ Change Password
- ✅ Delete Account
- 🔐 JWT Authentication

---

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (jsonwebtoken)
- Bcrypt (hash password)

---

## 📁 Struktur Direktori

```
login-api/
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── db.js
│   └── user.js
├── routes/
│   └── authRoutes.js
├── migrations/
│   └── 001-create-user-table.js
├── .env
├── package.json
├── server.js
```

---

## ⚙️ Instalasi & Konfigurasi

### 1. Clone repository

```bash
git clone <repo_url>
cd login-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file `.env` atau gunakan `.env.example`

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=login_db
JWT_SECRET=super_secret
PORT=5000
```

### 4. Jalankan Migration

```bash
node migrations/001-create-user-table.js
```

### 5. Jalankan Server

```bash
node server.js
```

---

## 🧪 Cara Menggunakan API (via `curl`)

### 🔸 Register

```bash
curl -X POST http://localhost:5000/api/register -H "Content-Type: application/json" -d '{"name":"Wayan","birthdate":"2000-01-01","phone":"081234567890","email":"wayan@example.com","password":"password123"}'
```

### 🔸 Login

```bash
curl -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d '{"email":"wayan@example.com","password":"password123"}'
```

> Simpan token dari hasil login untuk digunakan di endpoint berikutnya.

### 🔸 Update Akun

```bash
curl -X PUT http://localhost:5000/api/update -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"name":"Wayan Updated","birthdate":"2001-01-01","phone":"081298765432"}'
```

### 🔸 Ganti Password

```bash
curl -X PUT http://localhost:5000/api/change-password -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"oldPassword":"password123","newPassword":"newpass456"}'
```

### 🔸 Hapus Akun

```bash
curl -X DELETE http://localhost:5000/api/delete -H "Authorization: Bearer <TOKEN>"
```

---

## 🗂️ Tabel User

| Field     | Tipe   | Keterangan      |
| --------- | ------ | --------------- |
| id        | INT    | Primary Key     |
| name      | STRING | Nama lengkap    |
| birthdate | STRING | Tanggal lahir   |
| phone     | STRING | Nomor telepon   |
| email     | STRING | Unique Email    |
| password  | STRING | Hashed password |

---

## 🛡️ Keamanan

- Password disimpan dalam bentuk hash menggunakan `bcrypt`.
- Semua endpoint sensitif dilindungi oleh `JWT`.

---

## 🧑 Author

Wayan Christian Pradayana

---
