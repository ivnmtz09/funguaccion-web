# 🌱 Sistema de Gestión - Fundación Funguacción

Plataforma web para la **Fundación Funguacción**, desarrollada con **Django REST Framework** en el backend y **React + Vite + TailwindCSS** en el frontend.  
Incluye **autenticación JWT**, sistema de roles y perfiles de usuario personalizables.

## 📋 Tabla de Contenidos

- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Características principales](#-características-principales)
- [Instalación y configuración](#-instalación-y-configuración)
- [Endpoints del API](#-endpoints-del-api)
- [Guía para colaboradores](#-guía-para-colaboradores)
- [Estructura del proyecto](#-estructura-del-proyecto)

## 🛠️ Tecnologías utilizadas

### **Backend**
- Django 5.x
- Django REST Framework
- SimpleJWT
- MySQL
- CORS Headers
- Python-dotenv

### **Frontend**
- React
- Vite
- TailwindCSS
- Axios
- React Router DOM
- Lucide Icons

## ✨ Características principales

- 🔐 **Autenticación con JWT** (login, logout, registro)
- 👥 **Sistema de roles y permisos** (Administrador, Editor, Visitante)
- 👤 **Perfiles de usuario** con datos personales, contacto y biografía
- 🔄 **Persistencia de sesión** y blacklist de tokens
- 📱 **Diseño responsive** moderno con TailwindCSS

## 🚀 Instalación y configuración

### Prerrequisitos

- Python 3.8+
- Node.js 16+
- MySQL
- Git

### 1️⃣ Clonar el repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/funguaccion-web.git
cd funguaccion-web
\`\`\`

### 2️⃣ Configuración del Backend (Django + DRF)

#### Crear y activar entorno virtual

\`\`\`bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate
\`\`\`

#### Instalar dependencias

\`\`\`bash
pip install -r requirements.txt
\`\`\`

#### Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

\`\`\`env
SECRET_KEY=tu_clave_secreta
DEBUG=True

DB_NAME=funguaccion_db
DB_USER=usuario_db
DB_PASSWORD=contraseña_db
DB_HOST=localhost
DB_PORT=3306
\`\`\`

#### Ejecutar migraciones y servidor

\`\`\`bash
python manage.py migrate
python manage.py runserver
\`\`\`

El backend estará disponible en: `http://localhost:8000`

### 3️⃣ Configuración del Frontend (React + Vite + Tailwind)

\`\`\`bash
cd funguaccion-frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
\`\`\`

El frontend estará disponible en: `http://localhost:5173`

## 📖 Endpoints del API

| Método | URL | Descripción |
|--------|-----|-------------|
| `POST` | `/api/users/register/` | Registro de usuario |
| `POST` | `/api/users/login/` | Login y obtención de tokens |
| `POST` | `/api/users/logout/` | Logout e invalidación de token |
| `GET` | `/api/users/me/` | Ver perfil del usuario autenticado |
| `PUT` | `/api/users/me/update/` | Actualizar perfil |
| `GET` | `/api/users/me/permissions/` | Consultar permisos del usuario |
| `GET` | `/api/users/` | Listar usuarios (requiere permisos) |

## 👥 Guía para colaboradores

### Primera configuración

1. **Clonar el repositorio:**
   \`\`\`bash
   git clone https://github.com/tu-usuario/funguaccion-web.git
   cd funguaccion-web
   \`\`\`

2. **Configurar el backend:**
   \`\`\`bash
   python -m venv venv
   venv\Scripts\activate  # En Windows
   pip install -r requirements.txt
   \`\`\`

3. **Configurar variables de entorno:**
   - Crear archivo `.env` con las credenciales proporcionadas
   - Ejecutar migraciones: `python manage.py migrate`

4. **Configurar el frontend:**
   \`\`\`bash
   cd funguaccion-frontend
   npm install
   npm run dev
   \`\`\`

### Flujo de trabajo

1. **Antes de trabajar:**
   \`\`\`bash
   git pull origin main
   \`\`\`

2. **Hacer cambios y subirlos:**
   \`\`\`bash
   git add .
   git commit -m "Descripción clara del cambio"
   git push origin main
   \`\`\`

⚠️ **Importante:** Siempre hacer `git pull origin main` antes de hacer push para evitar conflictos.