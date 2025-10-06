# 📝 Full Stack Note-Taking Web App

A responsive and feature-rich **Note-Taking Application** built using **ReactJS (Frontend)** and **Django REST Framework (Backend)**.  
This application allows users to **create, manage, and search notes efficiently**, with secure user authentication and a clean, modern interface.

[Demo](https://github.com/user-attachments/assets/e91b2fb9-c673-4492-bb87-ae2d90968e45)

---

## 🚀 Features

- 🔐 **User Authentication** — Sign up, login, and manage notes securely.  
- 📝 **Note Management** — Create, edit, delete, and view notes with ease.  
- 🔍 **Search Functionality** — Quickly find notes by title or content.  
- 📱 **Responsive Design** — Optimized for both desktop and mobile devices.  
- ⚡ **Fast & Lightweight** — Built with React and Django REST API for smooth performance.

---

## 🛠️ Tech Stack

**Frontend**  
- ⚛️ React.js  
- React Router DOM  
- Axios  
- JWT Decode  

**Backend**  
- 🐍 Python  
- 🧱 Django  
- 🌐 Django REST Framework  
- SQLite (default, can be replaced)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and npm  
- [Python](https://www.python.org/) and pip  
- [Django](https://www.djangoproject.com/) & Django REST Framework

---

## 🧭 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ronnit44/FullStack-Note-taking-webapp.git
cd FullStack-Note-taking-webapp
```
---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install axios react-router-dom jwt-decode
npm run dev
```

The React development server should now be running on **[http://localhost:5173/](http://localhost:5173/)** (or a similar port).

---

### 3️⃣ Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment
   (Refer to [this guide](https://www.geeksforgeeks.org/clone-and-run-a-django-project-from-github/) if needed)

   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```bash
   python manage.py migrate
   ```

5. Create a superuser:

   ```bash
   python manage.py createsuperuser
   ```

6. Run the Django server:

   ```bash
   python manage.py runserver
   ```

The backend will be available at **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**.

---

## 🌐 Project Structure

```
FullStack-Note-taking-webapp/
├── frontend/             # React frontend
├── backend/              # Django backend
├── README.md
└── requirements.txt
```

---







