# Backend Course API

A modular RESTful API built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**. This service provides user authentication, movie database management, and user watchlist tracking with schema validation powered by **Zod**.

---

## Key Features

- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing (`/auth/register`, `/auth/login`, `/auth/logout`).
- **Watchlist Management**: User-specific movie watchlist operations including tracking watch status (`PLANNED`, `WATCHING`, `COMPLETED`, `DROPPED`), custom ratings, and notes (`/watchlist`).
- **Movie Catalog API**: REST routes for movie entity operations (`/movies`).
- **Database Modeling & Migrations**: Strongly-typed data access with Prisma ORM connected to PostgreSQL.
- **Request Validation**: Schema-based request body validation powered by Zod middleware.

---

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js (v5)
- **Database**: PostgreSQL
- **ORM**: Prisma (v7)
- **Validation**: Zod
- **Authentication**: JSON Web Token (`jsonwebtoken`), `bcryptjs`

---

## Project Structure

```text
.
├── prisma/
│   ├── schema.prisma      # Prisma database schema definition
│   ├── seed.js            # Database seeding script
│   └── migrations/        # SQL migration history
├── src/
│   ├── config/            # Database connection setup
│   ├── controllers/       # Route request handlers
│   ├── middleware/        # Authentication & request validation middleware
│   ├── routes/            # Express route declarations
│   ├── utils/             # Helper utilities (e.g., JWT generation)
│   ├── validators/        # Zod validation schemas
│   └── server.js          # Express app entry point & server lifecycle
├── .env.example           # Example environment variables
├── package.json
└── prisma.config.ts       # Prisma configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database instance

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bedru-Mekiyu/backend-course.git
   cd backend-course
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
   Set `DATABASE_URL` and `JWT_SECRET` in `.env`.

4. **Run Database Migrations & Generate Client**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **(Optional) Seed Database**:
   ```bash
   npm run seed
   ```

### Running the Server

- **Development mode** (with nodemon):
  ```bash
  npm run dev
  ```
- **Production start**:
  ```bash
  node src/server.js
  ```

---

## API Overview

### Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate user and receive JWT token
- `POST /auth/logout` - User logout

### Watchlist (`/watchlist`) *(Requires Authorization Header)*
- `POST /watchlist` - Add movie to watchlist
- `PUT /watchlist/:id` - Update watchlist item (status, rating, notes)
- `DELETE /watchlist/:id` - Remove item from watchlist

### Movies (`/movies`)
- `GET /movies` - List movies
- `POST /movies` - Create movie record
- `PUT /movies` - Update movie record
- `DELETE /movies` - Delete movie record

---

## License

[ISC](LICENSE)
