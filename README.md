# Sistema de gestión completo para la Fundación Funguacción desarrollado con Django en el backend y React en el frontend, con autenticación JWT y sistema de roles.
## 🛠️ Tecnologías

### Backend:

    Django

    Django REST Framework

    SimpleJWT

    MySQL

### Frontend:

    React

    Vite

    TailwindCSS

## Características principales:

    Autenticación con JWT (login, logout, registro)

    Sistema de roles y permisos

    Diseño moderno con Tailwind

    Persistencia de sesión

    Blacklist de tokens

# 🚀 Instrucciones de instalación
## 🔧 Backend

### Clonar repositorio
git clone https://github.com/tu-usuario/funguaccion.git
cd funguaccion-web

### Crear y activar entorno virtual (Windows)
python -m venv venv
venv\Scripts\activate

### O en Linux/macOS:
source venv/bin/activate

### Instalar dependencias
pip install -r requirements.txt

### Configurar variables de entorno (crear archivo .env)
echo "SECRET_KEY=tu_clave_secreta_django" > .env
echo "DEBUG=True" >> .env
echo "DB_NAME=funguaccion_db" >> .env
echo "DB_USER=usuario_db" >> .env
echo "DB_PASSWORD=contraseña_db" >> .env
echo "DB_HOST=localhost" >> .env

### Ejecutar migraciones
python manage.py migrate

### Crear superusuario (opcional)
python manage.py createsuperuser

### Iniciar servidor
python manage.py runserver

## 💻 Frontend

cd funguaccion-frontend

### Instalar dependencias
npm install

### Iniciar aplicación
npm run dev

# 📖 Características principales
## 👤 Gestión de usuarios

    Registro con asignación automática de rol "Visitante"

    Inicio de sesión con persistencia de token JWT

    Perfiles de usuario personalizables

    Sistema de logout con invalidación de token

## 🛡️ Sistema de roles

    Roles predefinidos: Administrador, Editor, Visitante

    Panel de administración para gestión de roles

    Permisos granulares por funcionalidad

    Asignación manual de roles (solo administradores)

## ✨ Interfaz moderna

    Diseño responsive con TailwindCSS

    Animaciones y transiciones suaves

    Componentes reutilizables

    Temas claros y oscuros

    Dashboard intuitivo

## 🔐 Variables de entorno

Crear un archivo .env en el directorio funguaccion-web con:
env

SECRET_KEY=tu_clave_secreta_django
DEBUG=True
DB_NAME=funguaccion_db
DB_USER=usuario_db
DB_PASSWORD=contraseña_db
DB_HOST=localhost
JWT_EXPIRATION=86400  # 1 día en segundos
