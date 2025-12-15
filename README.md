# Socket Chat App

A full-stack real-time chat application with:
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, Socket.IO, Cloudinary uploads
- Frontend: React (Vite), React Router, Axios, TailwindCSS, Socket.IO client

Monorepo layout:
- ChatServer/ — REST API + WebSocket server
- Frontend/ — React client

---

## Prerequisites
- Node.js LTS (v18+ recommended)
- A MongoDB connection string (MongoDB Atlas or local)
- Cloudinary account credentials (for image messages)

---

## Environment Variables

Create the following .env files before running.

### ChatServer/.env
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=some_long_random_secret
Cloudinary_Cloud_Name=your_cloud_name
Cloudinary_API_Key=your_api_key
Cloudinary_API_Secret=your_api_secret
```
Notes:
- The variable names for Cloudinary must match the exact casing above (see ChatServer/lib/cloudinary.js).
- `MONGODB_URI` is read in ChatServer/db/index.js.

### Frontend/.env
```
VITE_BACKEND_URL=http://localhost:5000/api
VITE_URL=http://localhost:5000
```
Notes:
- `VITE_BACKEND_URL` is used as Axios base URL in `src/context/authContext.jsx`.
- `VITE_URL` is used by Socket.IO client to connect to the backend Socket.IO server.

---

## Install & Run

### 1) Backend (ChatServer)
```powershell
cd "ChatServer"
npm install
npm run start
```
- Starts Express + Socket.IO using nodemon on `PORT` (default 5000).
- API base URL: `http://localhost:5000/api`

### 2) Frontend (React client)
```powershell
cd "Frontend"
npm install
npm run dev
```
- Vite dev server runs (default on 5173). Open the printed URL.

---

## API Overview
Base: `http://localhost:5000/api`

- Auth
  - POST `/auth/signup` — Sign up
  - POST `/auth/login` — Login
  - PUT `/auth/update-profile` — Update profile (protected)
  - GET `/auth/check-auth` — Check session (protected)

- Messages
  - GET `/messages/users` — Sidebar users + unseen counts (protected)
  - GET `/messages/:id` — Conversation with selected user (protected)
  - PUT `/messages/mark/:id` — Mark a single message as seen (protected)
  - POST `/messages/send/:id` — Send text/image to user (protected)

Socket events:
- Server emits `online-users` with an array of online userIds
- Server emits `new-message` to the receiver when they are online

---

## Project Structure (high level)
```
ChatServer/
  server.js                  # Express + Socket.IO setup
  db/index.js                # Mongo connection (uses MONGODB_URI)
  models/                    # Mongoose models (User, Message)
  controllers/               # Auth & message controllers
  routes/                    # /api/auth, /api/messages
  middlewares/               # JWT protectRoute
  lib/cloudinary.js          # Cloudinary config (uses Cloudinary_* envs)

Frontend/
  src/
    context/                 # authContext, ChatContext
    components/              # Sidebar, ChatContainer, RightSidebar
    pages/                   # LoginPage, HomePage, ProfilePage
    lib/utils.js             # helpers
```

---

## Development Notes
- The frontend sets `axios.defaults.baseURL` from `VITE_BACKEND_URL`. Ensure it includes `/api`.
- Socket connects using `VITE_URL` and passes `userId` as query.
- Message images are uploaded to Cloudinary in the backend controller before saving.

---

## Troubleshooting
- Backend not starting (Exit code 1):
  - Ensure `ChatServer/.env` exists and `MONGODB_URI` is valid.
  - Check that the port is free or change `PORT`.
- 401 Unauthorized on API calls:
  - Login first; token is stored in localStorage and set as `axios.defaults.headers.common["token"]`.
  - Verify `VITE_BACKEND_URL` is correct.
- Socket not connecting:
  - Ensure backend is running and `VITE_URL` matches the backend origin.
  - Check browser console/network logs for CORS or connection errors.
- Cloudinary upload errors:
  - Verify `Cloudinary_Cloud_Name`, `Cloudinary_API_Key`, `Cloudinary_API_Secret` are set and correct.

---

## Scripts
- ChatServer: `npm run start` — runs `nodemon server.js`
- Frontend: `npm run dev` | `npm run build` | `npm run preview`

---

## License
This project is for learning/demo purposes. No license specified.
