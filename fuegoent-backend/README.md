# Fuego Entertainment — Backend API

Express + Knex REST API powering the Fuego Entertainment platform. Handles user authentication, permission-based access control, and full media asset management.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Setup](#setup)
3. [Database](#database)
   - [Users Table](#users-table)
   - [Media Table](#media-table)
4. [Permission Levels](#permission-levels)
5. [Authentication](#authentication)
6. [API Endpoints](#api-endpoints)
   - [Health](#health)
   - [Auth](#auth-routes)
   - [Users](#user-routes)
   - [Media](#media-routes)
7. [File Uploads](#file-uploads)
8. [Default Seed Data](#default-seed-data)
9. [Environment Variables](#environment-variables)
10. [NPM Scripts](#npm-scripts)

---

## Tech Stack

| Package | Purpose |
|---|---|
| Express | HTTP server and routing |
| Knex | SQL query builder and migrations |
| SQLite3 | Local development database |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth tokens (7-day expiry) |
| multer | Multipart file upload handling |
| helmet | HTTP security headers |
| dotenv | Environment variable loading |
| nodemon | Auto-restart on file changes (dev) |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file (copy from the example below)
# See Environment Variables section

# 3. Run database migrations
npx knex migrate:latest

# 4. Seed the database with default data
npx knex seed:run

# 5. Start the dev server
npm run dev
```

Server runs on **http://localhost:5000** by default.

---

## Database

Two tables: `users` and `media`. SQLite is used for local development. To switch to PostgreSQL for production, set `NODE_ENV=production` and provide a `DATABASE_URL`.

---

### Users Table

Stores all platform accounts.

| Column | Type | Description |
|---|---|---|
| `id` | integer (PK) | Auto-incremented primary key |
| `name` | string | Display name |
| `email` | string (unique) | Login email, always stored lowercase |
| `password_hash` | string | bcrypt hash (never returned by the API) |
| `permission_level` | enum | One of: `guest`, `user`, `poweruser`, `manager`, `owner` |
| `is_active` | boolean | Soft-disable accounts without deleting them |
| `created_at` | timestamp | Auto-set on insert |
| `updated_at` | timestamp | Auto-updated on every change |

---

### Media Table

Stores metadata for every image and asset on the platform. The actual files are either served from the Next.js `public/` folder (seeded records) or from the backend `uploads/` directory (new uploads via the API).

| Column | Type | Description |
|---|---|---|
| `id` | integer (PK) | Auto-incremented primary key |
| `title` | string | Human-readable name for the asset |
| `description` | text | Longer description shown in the UI or admin panel |
| `filename` | string | The bare filename, e.g. `archive-1.jpg` |
| `filepath` | string | Full path used by the frontend, e.g. `/images/archive/archive-1.jpg` or `/uploads/1234-hero.png` |
| `mimetype` | string | MIME type, e.g. `image/jpeg`, `image/png`, `image/webp` |
| `category` | string | Groups the asset — see valid values below |
| `price` | decimal(8,2) | Sale price in USD. `null` means the item is not for sale |
| `event_date` | date | Optional date to associate the asset with a specific event |
| `tags` | string | Comma-separated tags for filtering, e.g. `archive,fridays,vip` |
| `is_active` | boolean | Hide an asset from the public without deleting it |
| `sort_order` | integer | Controls display order within a category (lower = first) |
| `created_at` | timestamp | Auto-set on insert |
| `updated_at` | timestamp | Auto-updated on every change |

**Valid `category` values:**

| Value | Used For |
|---|---|
| `hero` | Hero / banner images on the home page |
| `collections` | Cover images for each weekly collection (Archive, Traviesa, Deseo) |
| `archive` | Photo gallery for Archive Fridays |
| `traviesa` | Photo gallery for Traviesa Saturdays |
| `deseo` | Photo gallery for Deseo Sundays |
| `events` | Event flyers and promotional posters |
| `products` | Purchasable items (tickets, table packages, merchandise) |

---

## Permission Levels

Every user is assigned one of five permission levels. They are hierarchical — a higher level includes all capabilities of levels below it.

| Level | Rank | Capabilities |
|---|---|---|
| `guest` | 0 | Read-only access to public endpoints (no account required) |
| `user` | 1 | Authenticated basic access; can view their own profile |
| `poweruser` | 2 | Elevated user — reserved for future features |
| `manager` | 3 | Full CRUD on media and users; can create accounts up to their own level |
| `owner` | 4 | Everything a manager can do, plus deleting user accounts and assigning any permission level |

The `guest` level represents unauthenticated visitors. You do not need an account or token to hit public GET endpoints.

---

## Authentication

The API uses **JWT Bearer tokens**. After logging in, include the token in the `Authorization` header on every protected request.

```
Authorization: Bearer <your_token>
```

Tokens expire after **7 days**. Log in again to get a new token.

Passwords are hashed with **bcrypt (12 rounds)** and are never returned by any endpoint.

---

## API Endpoints

Base URL: `http://localhost:5000`

---

### Health

#### `GET /health`

Returns server status. No authentication required.

**Response**
```json
{
  "status": "ok",
  "service": "fuegoent-backend"
}
```

---

### Auth Routes

#### `POST /api/auth/login`

Authenticates a user and returns a JWT token.

**Access:** Public — no token required.

**Request Body**
```json
{
  "email": "fjchavez01@gmail.com",
  "password": "fuego2024"
}
```

| Field | Required | Description |
|---|---|---|
| `email` | Yes | The account's email address |
| `password` | Yes | The account's plaintext password |

**Success Response — 200**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Fern",
    "email": "fjchavez01@gmail.com",
    "permission_level": "manager",
    "is_active": 1,
    "created_at": "2026-05-12 04:45:03",
    "updated_at": "2026-05-12 04:45:03"
  }
}
```

**Error Responses**
| Status | Reason |
|---|---|
| 400 | `email` or `password` missing from body |
| 401 | Email not found, account is inactive, or wrong password |

---

#### `GET /api/auth/me`

Returns the profile of the currently authenticated user.

**Access:** Any authenticated user (any permission level with a valid token).

**Headers**
```
Authorization: Bearer <token>
```

**Success Response — 200**
```json
{
  "id": 1,
  "name": "Fern",
  "email": "fjchavez01@gmail.com",
  "permission_level": "manager",
  "is_active": 1,
  "created_at": "2026-05-12 04:45:03",
  "updated_at": "2026-05-12 04:45:03"
}
```

**Error Responses**
| Status | Reason |
|---|---|
| 401 | No token or invalid/expired token |

---

### User Routes

#### `GET /api/users`

Returns a list of all users in the system.

**Access:** `manager` or `owner` only.

**Headers**
```
Authorization: Bearer <token>
```

**Success Response — 200**
```json
[
  {
    "id": 1,
    "name": "Fern",
    "email": "fjchavez01@gmail.com",
    "permission_level": "manager",
    "is_active": 1,
    "created_at": "2026-05-12 04:45:03",
    "updated_at": "2026-05-12 04:45:03"
  }
]
```

**Error Responses**
| Status | Reason |
|---|---|
| 401 | No token or invalid token |
| 403 | Authenticated but not manager or owner |

---

#### `GET /api/users/:id`

Returns a single user by ID.

**Access:** The user themselves (any level), or a `manager` / `owner`.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameter**
| Param | Description |
|---|---|
| `id` | The numeric user ID |

**Success Response — 200**
```json
{
  "id": 2,
  "name": "Jane",
  "email": "jane@example.com",
  "permission_level": "user",
  "is_active": 1,
  "created_at": "2026-05-12 05:00:00",
  "updated_at": "2026-05-12 05:00:00"
}
```

**Error Responses**
| Status | Reason |
|---|---|
| 401 | No token or invalid token |
| 403 | Trying to view someone else's profile without manager access |
| 404 | User ID does not exist |

---

#### `POST /api/users`

Creates a new user account.

**Access:** `manager` or `owner` only.

> A manager can create accounts up to and including `manager` level. Only an `owner` can create another `owner`.

**Headers**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "password": "securepassword",
  "permission_level": "user"
}
```

| Field | Required | Default | Description |
|---|---|---|---|
| `name` | Yes | — | Display name |
| `email` | Yes | — | Must be unique |
| `password` | Yes | — | Plaintext; hashed before storage |
| `permission_level` | No | `user` | One of: `guest`, `user`, `poweruser`, `manager`, `owner` |

**Success Response — 201**
```json
{
  "id": 3,
  "name": "Jane",
  "email": "jane@example.com",
  "permission_level": "user",
  "is_active": 1,
  "created_at": "2026-05-12 06:00:00",
  "updated_at": "2026-05-12 06:00:00"
}
```

**Error Responses**
| Status | Reason |
|---|---|
| 400 | Missing `name`, `email`, or `password`; or invalid `permission_level` |
| 401 | No token or invalid token |
| 403 | Not a manager/owner; or trying to assign a higher level than your own |
| 409 | Email address already in use |

---

#### `PUT /api/users/:id`

Updates a user's information.

**Access:**
- Any authenticated user can update their **own** `name`, `email`, and `password`.
- Only a `manager` or `owner` can change `permission_level` or `is_active`.
- You cannot assign a `permission_level` higher than your own.

**Headers**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameter**
| Param | Description |
|---|---|
| `id` | The numeric user ID to update |

**Request Body** — all fields optional; only include what you want to change
```json
{
  "name": "Fernando",
  "email": "newemail@example.com",
  "password": "newpassword",
  "permission_level": "poweruser",
  "is_active": true
}
```

| Field | Who Can Update | Description |
|---|---|---|
| `name` | Self, Manager, Owner | New display name |
| `email` | Self, Manager, Owner | New email; must be unique |
| `password` | Self, Manager, Owner | New plaintext password; hashed before storage |
| `permission_level` | Manager, Owner | New permission level (cannot exceed your own) |
| `is_active` | Manager, Owner | `true` or `false` to enable/disable the account |

**Success Response — 200** — returns the full updated user object (no password_hash).

**Error Responses**
| Status | Reason |
|---|---|
| 400 | Invalid `permission_level` value |
| 401 | No token or invalid token |
| 403 | Trying to edit another user without manager access, or assigning a level above your own |
| 404 | User ID does not exist |

---

#### `DELETE /api/users/:id`

Permanently deletes a user account.

**Access:** `owner` only.

> You cannot delete your own account, even as an owner.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameter**
| Param | Description |
|---|---|
| `id` | The numeric user ID to delete |

**Success Response — 200**
```json
{ "message": "User deleted." }
```

**Error Responses**
| Status | Reason |
|---|---|
| 400 | Attempting to delete your own account |
| 401 | No token or invalid token |
| 403 | Not an owner |
| 404 | User ID does not exist |

---

### Media Routes

#### `GET /api/media`

Returns all media records. Supports optional query filters.

**Access:** Public — no token required.

**Query Parameters** — all optional

| Param | Example | Description |
|---|---|---|
| `category` | `?category=products` | Filter by one of the valid category values |
| `is_active` | `?is_active=true` | Filter by active/inactive status. Omit to return all. |

**Example Requests**
```
GET /api/media
GET /api/media?category=events
GET /api/media?category=products&is_active=true
```

**Success Response — 200**
```json
[
  {
    "id": 21,
    "title": "Archive Fridays — Table Package",
    "description": "VIP table package for Archive Fridays. Includes bottle service for up to 8 guests.",
    "filename": "archive-fridays-58.png",
    "filepath": "/images/products/archive-fridays-58.png",
    "mimetype": "image/png",
    "category": "products",
    "price": 58,
    "event_date": null,
    "tags": "product,archive,fridays,table,vip",
    "is_active": 1,
    "sort_order": 1,
    "created_at": "2026-05-12 04:45:03",
    "updated_at": "2026-05-12 04:45:03"
  }
]
```

Results are ordered by `category` then `sort_order`.

---

#### `GET /api/media/:id`

Returns a single media record by ID.

**Access:** Public — no token required.

**URL Parameter**
| Param | Description |
|---|---|
| `id` | The numeric media ID |

**Success Response — 200** — returns a single media object (same shape as above).

**Error Responses**
| Status | Reason |
|---|---|
| 404 | Media ID does not exist |

---

#### `POST /api/media`

Creates a new media record. Accepts either a file upload or a manually provided `filepath`.

**Access:** `manager` or `owner` only.

**Headers**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Fields**

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Display title for the asset |
| `category` | Yes | One of: `hero`, `collections`, `archive`, `traviesa`, `deseo`, `events`, `products` |
| `file` | Conditional | The image file to upload (JPEG, PNG, WEBP, GIF, AVIF — max 20 MB). Required if `filepath` is not provided. |
| `filepath` | Conditional | Manual path to an already-hosted image (e.g. `/images/events/event-4.jpg`). Required if `file` is not provided. |
| `mimetype` | No | MIME type when using `filepath` instead of a file upload. Defaults to `image/jpeg`. |
| `description` | No | Longer text description. Defaults to empty string. |
| `price` | No | Decimal price in USD. Leave blank or omit for non-purchasable items. |
| `event_date` | No | ISO date string, e.g. `2026-06-15`. |
| `tags` | No | Comma-separated tags, e.g. `vip,bottle-service`. |
| `is_active` | No | `true` or `false`. Defaults to `true`. |
| `sort_order` | No | Integer. Lower numbers appear first. Defaults to `0`. |

**Success Response — 201** — returns the newly created media record.

**Error Responses**
| Status | Reason |
|---|---|
| 400 | Missing `title` or `category`; invalid `category`; no file or `filepath` provided; file type not allowed |
| 401 | No token or invalid token |
| 403 | Not a manager or owner |

---

#### `PUT /api/media/:id`

Updates an existing media record. All fields are optional — only include what you want to change. Optionally replaces the file.

**Access:** `manager` or `owner` only.

**Headers**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**URL Parameter**
| Param | Description |
|---|---|
| `id` | The numeric media ID to update |

**Form Fields** — all optional

| Field | Description |
|---|---|
| `file` | Upload a new image to replace the existing one (max 20 MB) |
| `title` | New display title |
| `description` | New description |
| `category` | New category (must be a valid value) |
| `price` | New price. Send an empty string to set it back to `null` (not for sale). |
| `event_date` | New event date or empty string to clear it |
| `tags` | New comma-separated tags |
| `is_active` | `true` or `false` |
| `sort_order` | New integer sort order |

**Success Response — 200** — returns the full updated media record.

**Error Responses**
| Status | Reason |
|---|---|
| 400 | Invalid `category` value |
| 401 | No token or invalid token |
| 403 | Not a manager or owner |
| 404 | Media ID does not exist |

---

#### `DELETE /api/media/:id`

Permanently deletes a media record. If the file was uploaded via the API (stored in `uploads/`), the file is also deleted from disk. Original seeded assets in the `public/` folder are not touched.

**Access:** `manager` or `owner` only.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameter**
| Param | Description |
|---|---|
| `id` | The numeric media ID to delete |

**Success Response — 200**
```json
{ "message": "Media deleted." }
```

**Error Responses**
| Status | Reason |
|---|---|
| 401 | No token or invalid token |
| 403 | Not a manager or owner |
| 404 | Media ID does not exist |

---

## File Uploads

Files uploaded via `POST /api/media` or `PUT /api/media/:id` are stored in the `uploads/` directory at the backend root and served at:

```
http://localhost:5000/uploads/<filename>
```

**Constraints:**
- Allowed types: JPEG, JPG, PNG, WEBP, GIF, AVIF
- Maximum file size: **20 MB**
- Filenames are auto-generated (`<timestamp>-<random>.<ext>`) to prevent collisions

Seeded images reference paths in the Next.js `public/` folder (e.g. `/images/archive/archive-1.jpg`) and are served directly by the frontend, not the backend.

---

## Default Seed Data

Running `npx knex seed:run` populates the database with the following:

### Users

| Name | Email | Password | Permission |
|---|---|---|---|
| Fern | fjchavez01@gmail.com | `fuego2024` | `manager` |

### Media (22 records)

| Category | Items |
|---|---|
| `hero` | hero-main.jpg |
| `collections` | archive-fridays.webp, traviesa-saturdays.jpg, deseo-sundays.png |
| `archive` | archive-1 through archive-5 |
| `traviesa` | traviesa-1 through traviesa-4 |
| `deseo` | deseo-1 through deseo-4 |
| `events` | event-1 through event-3 |
| `products` | archive-fridays-58.png ($58.00), banda-night.png ($35.00) |

> **Change your password** after first login — the seed password is stored in plain text in the seed file.

---

## Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this-in-production
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Port the server listens on. Defaults to `5000`. |
| `NODE_ENV` | No | `development` uses SQLite. `production` uses PostgreSQL via `DATABASE_URL`. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWT tokens. Use a long random string in production. |
| `DATABASE_URL` | Production only | PostgreSQL connection string, e.g. `postgresql://user:pass@host/db`. |

---

## NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the server with nodemon (auto-restarts on file changes) |
| `npm start` | Start the server without nodemon (production) |
| `npx knex migrate:latest` | Run all pending migrations |
| `npx knex migrate:rollback` | Roll back the last migration batch |
| `npx knex seed:run` | Seed the database (deletes existing data first) |
