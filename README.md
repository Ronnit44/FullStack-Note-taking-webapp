# Scribe - Note-Taking Application

A full-stack note-taking application with a beautiful vintage-inspired UI. Built with **React** (Vite) and **Django REST Framework**.

---

## Features

- **Rich Text Editor** - Format notes with bold, italic, lists, and more
- **Color Tags** - Organize notes with color-coded labels
- **Pin Notes** - Keep important notes at the top
- **User Authentication** - Secure login and registration
- **Search** - Quickly find notes by title or content
- **Responsive Design** - Works on desktop and mobile

---

## Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 + Vite | Django 5 |
| React Router DOM | Django REST Framework |
| React Quill (Rich Text) | Simple JWT (Auth) |
| React Hot Toast | PostgreSQL (Production) |
| date-fns | SQLite (Development) |

---

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Ronnit44/FullStack-Note-taking-webapp.git
cd FullStack-Note-taking-webapp
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend runs at: `http://127.0.0.1:8000/`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://127.0.0.1:8000" > .env

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173/`

---

## Deployment Guide

### Deploy Backend to Render

1. **Push to GitHub** - Ensure your code is pushed to a GitHub repository.

2. **Create Render Account** - Sign up at [render.com](https://render.com)

3. **Create PostgreSQL Database**
   - Go to Dashboard → New → PostgreSQL
   - Name: `scribe-db`
   - Choose Free plan
   - Click "Create Database"
   - Copy the **Internal Database URL** for later

4. **Create Web Service**
   - Go to Dashboard → New → Web Service
   - Connect your GitHub repository
   - Configure:
     - **Name**: `scribe-api`
     - **Root Directory**: `backend`
     - **Runtime**: Python 3
     - **Build Command**: `pip install -r ../requirements.txt`
     - **Start Command**: `gunicorn backend.wsgi:application`

5. **Set Environment Variables**
   - Click "Environment" tab and add:
   
   | Key | Value |
   |-----|-------|
   | `SECRET_KEY` | Generate a random 50+ character string |
   | `DEBUG` | `False` |
   | `DATABASE_URL` | Paste the Internal Database URL from step 3 |
   | `ALLOWED_HOSTS` | `scribe-api.onrender.com` (your Render URL) |
   | `CORS_ALLOWED_ORIGINS` | `https://your-frontend.vercel.app` (add after frontend deploy) |

6. **Deploy** - Click "Create Web Service"

7. **Run Migrations** - In Render Shell or via deploy:
   ```bash
   python manage.py migrate
   ```

8. **Note your backend URL** (e.g., `https://scribe-api.onrender.com`)

---

### Deploy Frontend to Vercel

1. **Create Vercel Account** - Sign up at [vercel.com](https://vercel.com)

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`

3. **Set Environment Variables**
   - Add the following:
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://scribe-api.onrender.com` (your Render backend URL) |

4. **Deploy** - Click "Deploy"

5. **Note your frontend URL** (e.g., `https://scribe-app.vercel.app`)

---

### Post-Deployment: Connect Frontend & Backend

1. **Update Render CORS**
   - Go to your Render Web Service → Environment
   - Update `CORS_ALLOWED_ORIGINS` to include your Vercel URL:
     ```
     https://scribe-app.vercel.app
     ```
   - Trigger a redeploy

2. **Update Render ALLOWED_HOSTS** (if needed)
   - Add your full Render URL to `ALLOWED_HOSTS`

3. **Test the Application**
   - Visit your Vercel URL
   - Register a new account
   - Create some notes!

---

## Project Structure

```
FullStack-Note-taking-webapp/
├── backend/
│   ├── api/              # Django app (models, views, serializers)
│   ├── backend/          # Django settings
│   └── manage.py
├── frontend/
│   ├── public/           # Static assets (images, logo)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS files
│   │   └── App.jsx       # Main app
│   ├── vercel.json       # Vercel config
│   └── package.json
├── render.yaml           # Render blueprint
├── requirements.txt      # Python dependencies
└── README.md
```

---

## Environment Variables Reference

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | Random 50+ chars |
| `DEBUG` | Debug mode | `False` |
| `DATABASE_URL` | PostgreSQL connection URL | `postgres://...` |
| `ALLOWED_HOSTS` | Allowed domain names | `scribe-api.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs for CORS | `https://app.vercel.app` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://scribe-api.onrender.com` |

---

