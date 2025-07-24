# 🔐 SAMPAHIN API

API ini menyediakan fitur autentikasi dasar (Register, Login, Update Profile, Change Password, Delete Account, Logout) menggunakan Express.js, MySQL, dan JWT. API ini dirancang sebagai bagian dari sistem yang lebih besar.

---

## 📁 Fitur (Implemented)

- ✅ Register (dengan peran default `user`)
- ✅ Login
- ✅ Logout
- ✅ Update Akun (nama, tanggal lahir, nomor telepon)
- ✅ Ganti Password
- ✅ Hapus Akun
- 🔐 JWT Authentication & Authorization

---

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (jsonwebtoken)
- Bcrypt (hashing password)
- Express-validator

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

### 1. Clone Repository

```bash
git clone <repo_url>
cd login-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi `.env`

Buat file `.env` atau salin dari `.env.example`:

```env
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
node migrations/002-create-laporan-table.js
```

### 5. Jalankan Server

```bash
node server.js
```

---

## 🧪 Cara Menggunakan API (via `curl`)

### 🔸 Register

```bash
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{
  "name":"Wayan",
  "birthdate":"2000-01-01",
  "phone":"081234567890",
  "email":"wayan@example.com",
  "password":"password123"
}'
```

> Role default akan otomatis di-set ke `user`.

### 🔸 Login

```bash
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{
  "email":"wayan@example.com",
  "password":"password123"
}'
```

> Token JWT akan diberikan sebagai respon. Simpan token tersebut untuk autentikasi endpoint lain.

### 🔸 Logout

```bash
curl -X POST http://localhost:5000/api/logout \
-H "Authorization: Bearer <TOKEN>"
```

### 🔸 Update Akun

```bash
curl -X PUT http://localhost:5000/api/update \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "name":"Wayan Updated",
  "birthdate":"2001-01-01",
  "phone":"081298765432"
}'
```

### 🔸 Ganti Password

```bash
curl -X PUT http://localhost:5000/api/change-password \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "oldPassword":"password123",
  "newPassword":"newpass456"
}'
```

### 🔸 Hapus Akun

```bash
curl -X DELETE http://localhost:5000/api/delete \
-H "Authorization: Bearer <TOKEN>"
```

---

## 🗂️ Struktur Tabel `users`

| Field     | Type    | Keterangan                 |
| --------- | ------- | -------------------------- |
| id        | INTEGER | Primary key (auto inc.)    |
| name      | STRING  | Nama lengkap               |
| birthdate | STRING  | Tanggal lahir              |
| phone     | STRING  | Nomor telepon              |
| email     | STRING  | Email unik                 |
| password  | STRING  | Password (hashed)          |
| role      | STRING  | Peran user (default: user) |
| createdAt | DATE    | Timestamp dibuat           |
| updatedAt | DATE    | Timestamp diperbarui       |

---

## 🗂️ Struktur Tabel `laporans`

| Field       | Type    | Keterangan                 |
| ---------   | ------- | -------------------------- |
| id          | INTEGER | Primary key (auto inc.)    |
| id_user     | STRING  | Id user pelapor            |
| title       | STRING  | Judul Laporan              |
| description | STRING  | deskripsi laporan          |
| photo       | STRING  | foto laporan               |
| tanggal     | DATE    | tanggal laporan            |
| status      | STRING  | status laporan             |
| lokasi      | STRING  | lokasi laporan             |
| kategori    | STRING  | kategori laporan           |
| createdAt   | DATE    | Timestamp dibuat           |
| updatedAt   | DATE    | Timestamp diperbarui       |

---

## 🔐 Role & Authorization

- Default role saat register adalah `user`.
- Role lainnya seperti `admin`, `petugas`, dll dapat di-set manual atau melalui API admin khusus (belum tersedia).
- Role bisa digunakan untuk membatasi akses fitur tertentu pada sistem utama.

---

## 🛡️ Keamanan

- Password disimpan dalam bentuk hash dengan `bcrypt`.
- Endpoint sensitif diamankan dengan `JWT` yang harus dikirim dalam header `Authorization: Bearer <TOKEN>`.

---

## 🧑 Author

Wayan Christian Pradayana

---
