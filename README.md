# Funguacción Web

Sistema de gestión para la Fundación Funguacción con Django + MySQL + React.

## 🛠️ Tecnologías

- Backend: Django, Django REST Framework, SimpleJWT, MySQL
- Frontend: React, Vite, TailwindCSS
- Autenticación con JWT (login, logout, registro)
- Sistema de roles y permisos
- Diseño moderno con Tailwind

## 📁 Estructura

funguaccion-web/
├── backend/
├── apps/
├── manage.py
├── .env
├── requirements.txt
├── funguaccion-frontend/
│ ├── src/
│ ├── index.html
│ ├── tailwind.config.js
│ ├── ...
├── .gitignore
├── README.md
└── venv/

## 🚀 Instrucciones

### 🔧 Backend

```bash
cd funguaccion-web
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
